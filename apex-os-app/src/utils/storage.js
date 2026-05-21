const STORAGE_KEY = 'apex-os-state-v1';

export const DEFAULT_PROFILE = {
  name: '',
  age: '',
  height: '',
  weight: '',
  goal: '',
  photo: null,
};

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function resetMealChecks(nutrition) {
  if (!nutrition?.meals) return nutrition;

  const meals = Object.fromEntries(
    Object.entries(nutrition.meals).map(([mealKey, items]) => [
      mealKey,
      (items || []).map(item => ({ ...item, checked: false })),
    ])
  );

  return { ...nutrition, meals };
}

export function normalizeDailyAppState(state, todayKey = getLocalDateKey()) {
  const shouldResetMeals = state.lastMealResetDate && state.lastMealResetDate !== todayKey;

  return {
    ...state,
    nutrition: shouldResetMeals ? resetMealChecks(state.nutrition) : state.nutrition,
    lastMealResetDate: todayKey,
  };
}

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
