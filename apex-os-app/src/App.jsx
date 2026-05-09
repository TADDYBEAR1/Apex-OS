import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import FocusMode from './components/FocusMode';
import RecordsScreen from './components/RecordsScreen';
import FuelScreen from './components/FuelScreen';
import BottomNav from './components/BottomNav';
import { DEFAULT_WORKOUT_PLAN } from './data/sampleData';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workoutPlan, setWorkoutPlan] = useState(DEFAULT_WORKOUT_PLAN);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [focusExercises, setFocusExercises] = useState(null);

  const handleEnterFocus = (exercises) => {
    setFocusExercises(exercises);
  };

  const handleExitFocus = () => {
    setFocusExercises(null);
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        {activeTab === 'home' && (
          <HomeScreen
            workoutPlan={workoutPlan}
            currentDay={currentDay}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'workout' && (
          <WorkoutScreen
            workoutPlan={workoutPlan}
            setWorkoutPlan={setWorkoutPlan}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            onEnterFocus={handleEnterFocus}
          />
        )}
        {activeTab === 'records' && <RecordsScreen />}
        {activeTab === 'fuel' && <FuelScreen />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
