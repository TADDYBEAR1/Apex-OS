const STORAGE_KEY = 'apex-os-state-v1';

export const DEFAULT_PROFILE = {
  name: '',
  age: '',
  height: '',
  weight: '',
  goal: '',
  photo: null,
};

export function loadAppState(defaultState) {
  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const saved = JSON.parse(raw);
    return {
      ...defaultState,
      ...saved,
      profile: { ...defaultState.profile, ...(saved.profile || {}) },
      nutrition: { ...defaultState.nutrition, ...(saved.nutrition || {}) },
      workoutPlan: saved.workoutPlan || defaultState.workoutPlan,
      benchmarks: saved.benchmarks || defaultState.benchmarks,
      workoutHistory: saved.workoutHistory || defaultState.workoutHistory,
    };
  } catch (error) {
    console.warn('Unable to load saved Apex OS state.', error);
    return defaultState;
  }
}

export function saveAppState(state) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to save Apex OS state.', error);
  }
}
