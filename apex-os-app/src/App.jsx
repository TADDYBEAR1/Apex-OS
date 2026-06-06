import React, { useEffect, useMemo, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import FocusMode from './components/FocusMode';
import RecordsScreen from './components/RecordsScreen';
import FuelScreen from './components/FuelScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import VisualShowcase, { VISUAL_SHOWCASE_SLUGS } from './components/VisualShowcase';
import { DEFAULT_WORKOUT_PLAN, NUTRITION_DATA, RECORDS_DATA, WORKOUT_HISTORY } from './data/sampleData';
import { DEFAULT_PROFILE, getLocalDateKey, loadAppState, normalizeDailyAppState, resetMealChecks, saveAppState } from './utils/storage';
import { applyWorkoutPersonalRecords } from './utils/stats';
import './index.css';

import WorkoutCompleteOverlay from './components/WorkoutCompleteOverlay';
import { StatusBar, Style } from '@capacitor/status-bar';

function CoreApp() {
  const initialState = useMemo(() => {
    const todayKey = getLocalDateKey();
    const loadedState = loadAppState({
      workoutPlan: DEFAULT_WORKOUT_PLAN,
      nutrition: NUTRITION_DATA,
      profile: DEFAULT_PROFILE,
      benchmarks: RECORDS_DATA.benchmarks,
      workoutHistory: WORKOUT_HISTORY,
      lastMealResetDate: todayKey,
    });
    
    // Force migration for V6 update
    if (!window.localStorage.getItem('apex-v6-migrated')) {
      loadedState.workoutPlan = DEFAULT_WORKOUT_PLAN;
      window.localStorage.setItem('apex-v6-migrated', 'true');
    }

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

  // Track workout duration
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lastWorkoutDuration, setLastWorkoutDuration] = useState(0);

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

  useEffect(() => {
    saveAppState({
      workoutPlan,
      nutrition,
      profile,
      benchmarks,
      workoutHistory,
      lastMealResetDate,
    });
  }, [workoutPlan, nutrition, profile, benchmarks, workoutHistory, lastMealResetDate]);

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

  const handleEnterFocus = ({ exercises, day, planName }) => {
    const startedAt = Date.now();
    setFocusSession({ exercises, day, planName, startedAt });
    setWorkoutStartTime(startedAt);
  };

  const handleExitFocus = (summary = {}) => {
    setFocusSession(null);
    if (workoutStartTime) {
      const durationSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
      setLastWorkoutDuration(durationSecs);
      const completedSets = summary.completedSets || [];
      if (completedSets.length > 0) {
        const completedAt = new Date().toISOString();
        const prResult = applyWorkoutPersonalRecords(benchmarks, completedSets, completedAt);
        if (prResult.detected.length > 0) {
          setBenchmarks(prResult.benchmarks);
        }
        setWorkoutHistory(prev => [
          ...prev,
          {
            id: `workout-${Date.now()}`,
            date: completedAt.slice(0, 10),
            startedAt: focusSession?.startedAt ? new Date(focusSession.startedAt).toISOString() : null,
            completedAt,
            day: focusSession?.day ?? currentDay,
            planName: focusSession?.planName || 'Workout',
            durationSeconds: durationSecs,
            totalSets: summary.totalSets || completedSets.length,
            plannedSetCount: summary.totalSets || completedSets.length,
            completedSets,
            detectedPrs: prResult.detected,
          },
        ]);
      }
      setShowCompletion(true);
      setWorkoutStartTime(null);
    }
  };

  const dismissCompletion = () => {
    setShowCompletion(false);
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

  // Focus Mode is a full-screen takeover
  if (focusSession) {
    return (
      <FocusMode
        exercises={focusSession.exercises}
        onExit={handleExitFocus}
      />
    );
  }

  return (
    <>
      {showCompletion && <WorkoutCompleteOverlay onDismiss={dismissCompletion} durationSeconds={lastWorkoutDuration} />}
      {showProfile && <ProfileScreen onClose={() => setShowProfile(false)} profile={profile} setProfile={setProfile} />}
      <div style={{ position: 'relative' }}>
        {activeTab === 'home' && (
          <HomeScreen
            workoutPlan={workoutPlan}
            currentDay={currentDay}
            onNavigate={handleNavigate}
            profile={profile}
            onOpenProfile={handleOpenProfile}
            workoutHistory={workoutHistory}
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
    return <VisualShowcase visual={visual} capture={params.get('capture') === '1'} />;
  }

  return <CoreApp />;
}
