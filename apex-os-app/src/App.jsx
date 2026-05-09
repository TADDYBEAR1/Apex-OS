import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import FocusMode from './components/FocusMode';
import RecordsScreen from './components/RecordsScreen';
import FuelScreen from './components/FuelScreen';
import BottomNav from './components/BottomNav';
import ReadinessModal from './components/ReadinessModal';
import { DEFAULT_WORKOUT_PLAN } from './data/sampleData';
import './index.css';

import WorkoutCompleteOverlay from './components/WorkoutCompleteOverlay';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workoutPlan, setWorkoutPlan] = useState(DEFAULT_WORKOUT_PLAN);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [focusExercises, setFocusExercises] = useState(null);
  const [systemState, setSystemState] = useState(null); // { readiness, pain }

  // Track workout duration
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lastWorkoutDuration, setLastWorkoutDuration] = useState(0);

  const handleEnterFocus = (exercises) => {
    setFocusExercises(exercises);
    setWorkoutStartTime(Date.now());
  };

  const handleExitFocus = () => {
    setFocusExercises(null);
    if (workoutStartTime) {
      const durationSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
      setLastWorkoutDuration(durationSecs);
      setShowCompletion(true);
      setWorkoutStartTime(null);
    }
  };

  const dismissCompletion = () => {
    setShowCompletion(false);
    setActiveTab('home'); // Route back to hub to feel like a "return"
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
  };

  // Focus Mode is a full-screen takeover
  if (focusExercises) {
    return (
      <FocusMode
        exercises={focusExercises}
        onExit={handleExitFocus}
      />
    );
  }

  const handleSystemStateComplete = (state) => {
    setSystemState(state);
  };

  return (
    <>
      {showCompletion && <WorkoutCompleteOverlay onDismiss={dismissCompletion} durationSeconds={lastWorkoutDuration} />}
      {!systemState && <ReadinessModal onComplete={handleSystemStateComplete} />}
      <div style={{ position: 'relative' }}>
        {activeTab === 'home' && (
          <HomeScreen
            workoutPlan={workoutPlan}
            currentDay={currentDay}
            onNavigate={handleNavigate}
            systemState={systemState}
          />
        )}
        {activeTab === 'workout' && (
          <WorkoutScreen
            workoutPlan={workoutPlan}
            setWorkoutPlan={setWorkoutPlan}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            onEnterFocus={handleEnterFocus}
            systemState={systemState}
          />
        )}
        {activeTab === 'records' && <RecordsScreen />}
        {activeTab === 'fuel' && <FuelScreen />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
