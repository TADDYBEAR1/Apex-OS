import React, { useEffect, useMemo, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import FocusMode from './components/FocusMode';
import RecordsScreen from './components/RecordsScreen';
import FuelScreen from './components/FuelScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import { DEFAULT_WORKOUT_PLAN, NUTRITION_DATA, RECORDS_DATA, WORKOUT_HISTORY } from './data/sampleData';
import { DEFAULT_PROFILE, loadAppState, saveAppState } from './utils/storage';
import './index.css';

import WorkoutCompleteOverlay from './components/WorkoutCompleteOverlay';

export default function App() {
  const initialState = useMemo(() => loadAppState({
    workoutPlan: DEFAULT_WORKOUT_PLAN,
    nutrition: NUTRITION_DATA,
    profile: DEFAULT_PROFILE,
    benchmarks: RECORDS_DATA.benchmarks,
    workoutHistory: WORKOUT_HISTORY,
  }), []);

  const [activeTab, setActiveTab] = useState('home');
  const [workoutPlan, setWorkoutPlan] = useState(initialState.workoutPlan);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [focusSession, setFocusSession] = useState(null);
  const [nutrition, setNutrition] = useState(initialState.nutrition);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(initialState.profile);
  const [benchmarks, setBenchmarks] = useState(initialState.benchmarks);
  const [workoutHistory, setWorkoutHistory] = useState(initialState.workoutHistory);

  // Track workout duration
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lastWorkoutDuration, setLastWorkoutDuration] = useState(0);

  useEffect(() => {
    saveAppState({
      workoutPlan,
      nutrition,
      profile,
      benchmarks,
      workoutHistory,
    });
  }, [workoutPlan, nutrition, profile, benchmarks, workoutHistory]);

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
      if ((summary.completedSets?.length || 0) > 0 || summary.completed) {
        const completedAt = new Date().toISOString();
        setWorkoutHistory(prev => [
          ...prev,
          {
            id: `workout-${Date.now()}`,
            date: completedAt.slice(0, 10),
            completedAt,
            day: focusSession?.day ?? currentDay,
            planName: focusSession?.planName || 'Workout',
            durationSeconds: durationSecs,
            totalSets: summary.totalSets || summary.completedSets?.length || 0,
            completedSets: summary.completedSets || [],
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
