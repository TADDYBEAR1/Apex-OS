const STORAGE_KEY = 'apex-os-state-v1';

// Bump this whenever the saved state shape changes, and add a migration below.
export const SCHEMA_VERSION = 10;

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

  return { ...nutrition, meals, water: { ...(nutrition.water || {}), current: 0 } };
}

export function normalizeDailyAppState(state, todayKey = getLocalDateKey()) {
  const shouldResetMeals = state.lastMealResetDate && state.lastMealResetDate !== todayKey;

  return {
    ...state,
    nutrition: shouldResetMeals ? resetMealChecks(state.nutrition) : state.nutrition,
    lastMealResetDate: todayKey,
  };
}

/**
 * Versioned migrations. Each entry upgrades state from (version - 1) to version.
 * Never mutate the user's customizations unless a migration explicitly requires it.
 */
function runMigrations(state, defaults) {
  let version = state.schemaVersion;

  if (version === undefined) {
    // Legacy installs: the old one-off "apex-v6-migrated" flag marks schema 6.
    const legacyFlag = typeof window !== 'undefined'
      && window.localStorage.getItem('apex-v6-migrated');
    version = legacyFlag ? 6 : 5;
  }

  let next = { ...state };

  if (version < 6) {
    // v6: new default workout plan structure (previously forced via a flag).
    next.workoutPlan = defaults.workoutPlan;
    version = 6;
  }

  if (version < 7) {
    // v7: workout sessions gained an optional `vas` pain log ({ knee, back }).
    next.workoutHistory = (next.workoutHistory || []).map(session => ({
      vas: null,
      ...session,
    }));
    version = 7;
  }

  if (version < 8) {
    // v8: mission-control layer — daily morning check-ins keyed by date,
    // and a configurable mission (campaign target + phases).
    next.checkins = next.checkins || {};
    next.mission = next.mission || null; // null → app falls back to DEFAULT_MISSION
    version = 8;
  }

  if (version < 9) {
    // v9: body-weight log for the trends screen: [{ date, kg }]
    next.weightLog = next.weightLog || [];
    version = 9;
  }

  if (version < 10) {
    // v10: saved plan snapshots [{ id, name, savedAt, plan }] and the
    // morning-reminder config { enabled, hour, minute }.
    next.planLibrary = next.planLibrary || [];
    next.reminder = next.reminder || { enabled: false, hour: 6, minute: 30 };
    version = 10;
  }

  return { ...next, schemaVersion: SCHEMA_VERSION };
}

export function loadAppState(defaultState) {
  if (typeof window === 'undefined') return { ...defaultState, schemaVersion: SCHEMA_VERSION };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState, schemaVersion: SCHEMA_VERSION };

    const saved = JSON.parse(raw);
    const merged = {
      ...defaultState,
      ...saved,
      profile: { ...defaultState.profile, ...(saved.profile || {}) },
      nutrition: { ...defaultState.nutrition, ...(saved.nutrition || {}) },
      workoutPlan: saved.workoutPlan || defaultState.workoutPlan,
      benchmarks: saved.benchmarks || defaultState.benchmarks,
      workoutHistory: saved.workoutHistory || defaultState.workoutHistory,
    };
    return runMigrations(merged, defaultState);
  } catch (error) {
    console.warn('Unable to load saved Apex OS state.', error);
    return { ...defaultState, schemaVersion: SCHEMA_VERSION };
  }
}

/**
 * Persists state. Returns true on success, false on failure (e.g. quota exceeded)
 * so the UI can surface the problem instead of losing data silently.
 */
export function saveAppState(state) {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, schemaVersion: SCHEMA_VERSION })
    );
    return true;
  } catch (error) {
    console.warn('Unable to save Apex OS state.', error);
    return false;
  }
}

// ---------- Backup: export / import ----------

export function exportAppState(state) {
  return JSON.stringify(
    { app: 'apex-os', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), state },
    null,
    2
  );
}

export function parseImportedAppState(raw, defaults) {
  const parsed = JSON.parse(raw);
  const candidate = parsed?.app === 'apex-os' ? parsed.state : parsed;

  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Invalid backup file: no state object found.');
  }
  if (!candidate.workoutHistory && !candidate.workoutPlan && !candidate.profile) {
    throw new Error('Invalid backup file: missing Apex OS data.');
  }

  const merged = {
    ...defaults,
    ...candidate,
    profile: { ...defaults.profile, ...(candidate.profile || {}) },
  };
  return runMigrations(merged, defaults);
}

export function getRawStoredState() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
