import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import FocusMode from './components/FocusMode';
import RecordsScreen from './components/RecordsScreen';
import FuelScreen from './components/FuelScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import AppDialog from './components/AppDialog';
import { VISUAL_SHOWCASE_SLUGS } from './components/visualShowcaseSlugs';
import { DEFAULT_WORKOUT_PLAN, NUTRITION_DATA, RECORDS_DATA, WORKOUT_HISTORY } from './data/sampleData';
import { DEFAULT_PROFILE, getLocalDateKey, loadAppState, normalizeDailyAppState, resetMealChecks, saveAppState } from './utils/storage';
import { applyWorkoutPersonalRecords } from './utils/stats';
import { RECOVERY_SESSION } from './utils/recovery';
import './index.css';

import WorkoutCompleteOverlay from './components/WorkoutCompleteOverlay';
import { StatusBar, Style } from '@capacitor/status-bar';

// Demo/marketing screens are lazy-loaded so they never weigh down the real app bundle.
const VisualShowcase = React.lazy(() => import('./components/VisualShowcase'));

const DEFAULT_STATE = {
  workoutPlan: DEFAULT_WORKOUT_PLAN,
  nutrition: NUTRITION_DATA,
  profile: DEFAULT_PROFILE,
  benchmarks: RECORDS_DATA.benchmarks,
  workoutHistory: WORKOUT_HISTORY,
};

function CoreApp() {
  const initialState = useMemo(() => {
    const todayKey = getLocalDateKey();
    // loadAppState runs versioned schema migrations internally (see utils/storage.js)
    const loadedState = loadAppState({ ...DEFAULT_STATE, lastMealResetDate: todayKey });
    return normalizeDailyAppState(loadedState, todayKey);
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [workoutPlan, setWorkoutPlan] = useState(initialState.workoutPlan);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [todayKey, setTodayKey] = useState(getLocalDateKey());
  const [focusSession, setFocusSession] = useState(null);
  const [nutrition, setNutrition] = useState(initialState.nutrition);
  const [lastMealResetDate, setLastMealResetDate] = useState(initialState.lastMealResetDate);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(initialState.profile);
  const [benchmarks, setBenchmarks] = useState(initialState.benchmarks);
  const [workoutHistory, setWorkoutHistory] = useState(initialState.workoutHistory);
  const [checkins, setCheckins] = useState(initialState.checkins || {});
  const [mission, setMission] = useState(initialState.mission || null);
  const [weightLog, setWeightLog] = useState(initialState.weightLog || []);
  const [planLibrary, setPlanLibrary] = useState(initialState.planLibrary || []);
  const [reminder, setReminder] = useState(initialState.reminder || { enabled: false, hour: 6, minute: 30 });

  // Track workout duration
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lastWorkoutDuration, setLastWorkoutDuration] = useState(0);
  const [lastSessionId, setLastSessionId] = useState(null);

  // Surfaced persistence failures (e.g. localStorage quota) instead of silent loss
  const [saveFailed, setSaveFailed] = useState(false);

  // In-app dialog (replaces native window.confirm): { title, message, confirmText,
  // cancelText, tone, onConfirm, onCancel? }
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const initNative = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#000000' });
      } catch (e) {
        // web fallback
      }
    };
    initNative();
  }, []);

  // Debounced persistence: avoids re-serialising full history on every keystroke,
  // and reports failures to the UI.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const ok = saveAppState({
        workoutPlan,
        nutrition,
        profile,
        benchmarks,
        workoutHistory,
        lastMealResetDate,
        checkins,
        mission,
        weightLog,
        planLibrary,
        reminder,
      });
      setSaveFailed(!ok);
    }, 400);
    return () => window.clearTimeout(timeoutId);
  }, [workoutPlan, nutrition, profile, benchmarks, workoutHistory, lastMealResetDate, checkins, mission, weightLog, planLibrary, reminder]);

  useEffect(() => {
    const syncCalendarDay = () => {
      const nextTodayKey = getLocalDateKey();
      if (nextTodayKey === todayKey) return;

      setTodayKey(nextTodayKey);
      setCurrentDay(new Date().getDay());
      setNutrition(prev => resetMealChecks(prev));
      setLastMealResetDate(nextTodayKey);
    };

    syncCalendarDay();
    const timerId = window.setInterval(syncCalendarDay, 60 * 1000);
    return () => window.clearInterval(timerId);
  }, [todayKey]);

  // ----- Android hardware back button -----
  // Priority: modal > completion overlay > focus mode (with confirm) > tab > minimize.
  const backHandlerRef = useRef(() => {});
  backHandlerRef.current = (minimizeApp) => {
    if (dialog) { setDialog(null); return; }
    if (showProfile) { setShowProfile(false); return; }
    if (showCompletion) { dismissCompletion(null); return; }
    if (focusSession) {
      setDialog({
        title: 'Exit Workout?',
        message: "Completed sets won't be saved if you leave now.",
        confirmText: 'EXIT',
        cancelText: 'STAY',
        tone: 'danger',
        onConfirm: () => {
          setFocusSession(null);
          setWorkoutStartTime(null);
        },
      });
      return;
    }
    if (activeTab !== 'home') { setActiveTab('home'); return; }
    minimizeApp?.();
  };

  useEffect(() => {
    let removeListener;
    (async () => {
      try {
        const { App: CapApp } = await import('@capacitor/app');
        const handle = await CapApp.addListener('backButton', () => {
          backHandlerRef.current(() => CapApp.minimizeApp());
        });
        removeListener = () => handle.remove();
      } catch {
        // Plugin unavailable (web / not installed) — browser back works as usual.
      }
    })();
    return () => removeListener?.();
  }, []);

  const startFocusSession = ({ exercises, day, planName }) => {
    const startedAt = Date.now();
    setFocusSession({ exercises, day, planName, startedAt });
    setWorkoutStartTime(startedAt);
  };

  const handleEnterFocus = ({ exercises, day, planName }) => {
    const checkin = checkins[todayKey];
    if (checkin?.light === 'red') {
      setDialog({
        title: '🔴 Red Gate',
        message: 'This morning came back red. Swap the planned workout for the built-in Recovery Protocol?\n(No impact, no heavy loading — pain stays ≤2/10.)',
        confirmText: 'RECOVERY SESSION',
        cancelText: 'PLAN ANYWAY',
        tone: 'danger',
        onConfirm: () => startFocusSession({
          exercises: RECOVERY_SESSION.exercises,
          day,
          planName: RECOVERY_SESSION.name,
        }),
        onCancel: () => startFocusSession({ exercises, day, planName }),
      });
      return;
    }
    startFocusSession({ exercises, day, planName });
  };

  // Progression APPLY: updates both the live session and the saved plan,
  // so next week starts from the new load automatically.
  const handleApplyProgression = (exercise, patch) => {
    if (!patch) return;
    const applyTo = (ex) => (ex.id === exercise.id || ex.name === exercise.name)
      ? { ...ex, [patch.field]: patch.value }
      : ex;

    setFocusSession(prev => prev
      ? { ...prev, exercises: prev.exercises.map(applyTo) }
      : prev);

    setWorkoutPlan(prev => prev.map((day, index) => {
      if (!day || (focusSession && index !== focusSession.day)) return day;
      return {
        ...day,
        exercises: {
          warmup: (day.exercises.warmup || []).map(applyTo),
          main: (day.exercises.main || []).map(applyTo),
          cooldown: (day.exercises.cooldown || []).map(applyTo),
        },
      };
    }));
  };

  // Quick body-weight logging (one entry per day, newest wins)
  const handleLogWeight = (kg) => {
    const date = getLocalDateKey();
    setWeightLog(prev => [...prev.filter(w => w.date !== date), { date, kg }]);
  };

  const handleUpdateMission = (updates) => {
    setMission(prev => ({ ...(prev || {}), ...updates }));
  };

  // ----- Plan library: snapshots of the weekly plan -----
  const handleSavePlanToLibrary = (name) => {
    const snapshot = {
      id: `plan-${Date.now()}`,
      name: name || `Plan · ${getLocalDateKey()}`,
      savedAt: new Date().toISOString(),
      plan: workoutPlan,
    };
    setPlanLibrary(prev => [snapshot, ...prev].slice(0, 12)); // keep the last 12
  };

  const handleLoadPlanFromLibrary = (id) => {
    const entry = planLibrary.find(p => p.id === id);
    if (entry) setWorkoutPlan(entry.plan);
  };

  const handleDeletePlanFromLibrary = (id) => {
    setPlanLibrary(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateReminder = (updates) => {
    setReminder(prev => ({ ...prev, ...updates }));
  };

  const handleExitFocus = (summary = {}) => {
    setFocusSession(null);
    if (workoutStartTime) {
      const durationSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
      setLastWorkoutDuration(durationSecs);
      const completedSets = summary.completedSets || [];
      if (completedSets.length > 0) {
        const completedAt = new Date().toISOString();
        const sessionId = `workout-${Date.now()}`;
        const prResult = applyWorkoutPersonalRecords(benchmarks, completedSets, completedAt);
        if (prResult.detected.length > 0) {
          setBenchmarks(prResult.benchmarks);
        }
        setWorkoutHistory(prev => [
          ...prev,
          {
            id: sessionId,
            // Local calendar date — completedAt.slice(0,10) is UTC and logs
            // post-midnight sessions on the wrong day in UTC+ timezones.
            date: getLocalDateKey(new Date(completedAt)),
            startedAt: focusSession?.startedAt ? new Date(focusSession.startedAt).toISOString() : null,
            completedAt,
            day: focusSession?.day ?? currentDay,
            planName: focusSession?.planName || 'Workout',
            durationSeconds: durationSecs,
            totalSets: summary.totalSets || completedSets.length,
            plannedSetCount: summary.totalSets || completedSets.length,
            completedSets,
            detectedPrs: prResult.detected,
            vas: null,
          },
        ]);
        setLastSessionId(sessionId);
      } else {
        setLastSessionId(null);
      }
      setShowCompletion(true);
      setWorkoutStartTime(null);
    }
  };

  const dismissCompletion = (vas) => {
    if (vas && lastSessionId) {
      setWorkoutHistory(prev => prev.map(session =>
        session.id === lastSessionId ? { ...session, vas } : session
      ));
    }
    setShowCompletion(false);
    setLastSessionId(null);
    setActiveTab('home');
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenProfile = () => setShowProfile(true);

  const handleUpdateWorkoutHistorySession = (sessionId, updatedSession) => {
    setWorkoutHistory(prev => prev.map(session =>
      session.id === sessionId ? { ...session, ...updatedSession } : session
    ));
  };

  const handleDeleteWorkoutHistorySession = (sessionId) => {
    setWorkoutHistory(prev => prev.filter(session => session.id !== sessionId));
  };

  // Restores a full state object from an imported (and already migrated) backup
  const handleImportState = (imported) => {
    const normalized = normalizeDailyAppState(imported, getLocalDateKey());
    setWorkoutPlan(normalized.workoutPlan);
    setNutrition(normalized.nutrition);
    setProfile(normalized.profile);
    setBenchmarks(normalized.benchmarks);
    setWorkoutHistory(normalized.workoutHistory);
    setLastMealResetDate(normalized.lastMealResetDate);
    setCheckins(normalized.checkins || {});
    setMission(normalized.mission || null);
    setWeightLog(normalized.weightLog || []);
    setPlanLibrary(normalized.planLibrary || []);
    setReminder(normalized.reminder || { enabled: false, hour: 6, minute: 30 });
  };

  const handleSaveCheckin = (data) => {
    setCheckins(prev => ({ ...prev, [todayKey]: { ...data, savedAt: new Date().toISOString() } }));
  };

  const appState = { workoutPlan, nutrition, profile, benchmarks, workoutHistory, lastMealResetDate, checkins, mission, weightLog, planLibrary, reminder };

  const dialogElement = dialog ? (
    <AppDialog
      {...dialog}
      onConfirm={() => { const fn = dialog.onConfirm; setDialog(null); fn?.(); }}
      onCancel={() => { const fn = dialog.onCancel; setDialog(null); fn?.(); }}
    />
  ) : null;

  // Focus Mode is a full-screen takeover
  if (focusSession) {
    return (
      <>
      {dialogElement}
      <FocusMode
        exercises={focusSession.exercises}
        onExit={handleExitFocus}
        startedAt={focusSession.startedAt}
        workoutHistory={workoutHistory}
        todayCheckin={checkins[todayKey] || null}
        onApplyProgression={handleApplyProgression}
      />
      </>
    );
  }

  return (
    <>
      {dialogElement}
      {saveFailed && (
        <div role="alert" style={{
          position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 8px)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 500,
          background: 'rgba(255,92,92,0.95)', color: '#000',
          padding: '8px 16px', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.05em',
        }}>
          ⚠ SAVE FAILED — storage full. Export your data from Profile.
        </div>
      )}
      {showCompletion && <WorkoutCompleteOverlay onDismiss={dismissCompletion} durationSeconds={lastWorkoutDuration} />}
      {showProfile && (
        <ProfileScreen
          onClose={() => setShowProfile(false)}
          profile={profile}
          setProfile={setProfile}
          appState={appState}
          onImportState={handleImportState}
          onLogWeight={handleLogWeight}
          mission={mission}
          onUpdateMission={handleUpdateMission}
          reminder={reminder}
          onUpdateReminder={handleUpdateReminder}
        />
      )}
      <div style={{ position: 'relative' }}>
        {activeTab === 'home' && (
          <HomeScreen
            workoutPlan={workoutPlan}
            currentDay={currentDay}
            onNavigate={handleNavigate}
            profile={profile}
            onOpenProfile={handleOpenProfile}
            workoutHistory={workoutHistory}
            mission={mission}
            todayCheckin={checkins[todayKey] || null}
            onSaveCheckin={handleSaveCheckin}
          />
        )}
        {activeTab === 'workout' && (
          <WorkoutScreen
            workoutPlan={workoutPlan}
            setWorkoutPlan={setWorkoutPlan}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            onEnterFocus={handleEnterFocus}
            profile={profile}
            onOpenProfile={handleOpenProfile}
            planLibrary={planLibrary}
            onSavePlan={handleSavePlanToLibrary}
            onLoadPlan={handleLoadPlanFromLibrary}
            onDeletePlan={handleDeletePlanFromLibrary}
          />
        )}
        {activeTab === 'records' && (
          <RecordsScreen
            nutrition={nutrition}
            benchmarks={benchmarks}
            setBenchmarks={setBenchmarks}
            workoutHistory={workoutHistory}
            onUpdateWorkoutSession={handleUpdateWorkoutHistorySession}
            onDeleteWorkoutSession={handleDeleteWorkoutHistorySession}
            profile={profile}
            onOpenProfile={handleOpenProfile}
            checkins={checkins}
            weightLog={weightLog}
          />
        )}
        {activeTab === 'fuel' && (
          <FuelScreen
            nutrition={nutrition}
            setNutrition={setNutrition}
            profile={profile}
            onOpenProfile={handleOpenProfile}
          />
        )}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const visual = params.get('visual');

  if (VISUAL_SHOWCASE_SLUGS.includes(visual)) {
    return (
      <Suspense fallback={null}>
        <VisualShowcase visual={visual} capture={params.get('capture') === '1'} />
      </Suspense>
    );
  }

  return (
    <ErrorBoundary>
      <CoreApp />
    </ErrorBoundary>
  );
}
