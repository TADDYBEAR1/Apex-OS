// Apex OS — Sample Data
// Pre-populated workout, nutrition, and records data

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export const EXERCISE_LIBRARY = [
  // Apex Activation Block
  { id: 'v6_1', name: 'Knee Isometrics', category: 'Legs', image: null, defaultSets: 2, defaultReps: 45, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
  { id: 'v6_2', name: 'Contralateral Bird-Dog', category: 'Core', image: null, defaultSets: 2, defaultReps: 10, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
  { id: 'v6_3', name: 'Chest-Supported Y-T-W', category: 'Shoulders', image: null, defaultSets: 2, defaultReps: 10, defaultWeight: 5, defaultRest: 60, isBodyweight: false },
  { id: 'v6_4', name: 'Banded Face Pulls', category: 'Shoulders', image: null, defaultSets: 2, defaultReps: 20, defaultWeight: 0, defaultRest: 45, isBodyweight: true },
  
  // The Heavy Trunk
  { id: 'v6_5', name: 'Contralateral Heavy Bulgarian Split Squat', category: 'Legs', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 24, defaultRest: 120, isBodyweight: false },
  { id: 'v6_6', name: 'Chest-Supported DB Row', category: 'Back', image: null, defaultSets: 4, defaultReps: 10, defaultWeight: 32, defaultRest: 90, isBodyweight: false },
  { id: 'v6_7', name: 'Flat DB Bench Press', category: 'Chest', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 40, defaultRest: 120, isBodyweight: false },
  { id: 'v6_8', name: 'Single Leg DB RDL', category: 'Legs', image: null, defaultSets: 3, defaultReps: 8, defaultWeight: 24, defaultRest: 90, isBodyweight: false },
  { id: 'v6_9', name: 'Heavy Suitcase Carries', category: 'Core', image: null, defaultSets: 3, defaultReps: 30, defaultWeight: 24, defaultRest: 90, isBodyweight: false },
  { id: 'v6_10', name: 'Side Plank', category: 'Core', image: null, defaultSets: 2, defaultReps: 45, defaultWeight: 0, defaultRest: 60, isBodyweight: true },

  // Parasympathetic Reset
  { id: 'v6_11', name: 'Towel Toe Curls', category: 'Legs', image: null, defaultSets: 3, defaultReps: 15, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
  { id: 'v6_12', name: 'Bear Crawl (Slow)', category: 'Core', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 0, defaultRest: 60, isBodyweight: true },
  { id: 'v6_13', name: 'Zone 2 Volume Run', category: 'Legs', image: null, defaultSets: 1, defaultReps: 45, defaultWeight: 0, defaultRest: 0, isBodyweight: true },

  // The Yoke Block & PFMT
  { id: 'v6_14', name: 'Seated Heavy Overhead Hold', category: 'Shoulders', image: null, defaultSets: 1, defaultReps: 240, defaultWeight: 20, defaultRest: 0, isBodyweight: false },
  { id: 'v6_15', name: 'Solid-Ground Cross-Body Catch', category: 'Core', image: null, defaultSets: 3, defaultReps: 60, defaultWeight: 0, defaultRest: 60, isBodyweight: true },
  { id: 'v6_16', name: 'The Pallof Press', category: 'Core', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 10, defaultRest: 60, isBodyweight: false },
  { id: 'v6_17', name: 'PFMT Kegel Routine', category: 'Core', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 0, defaultRest: 10, isBodyweight: true },
];

export const DEFAULT_WORKOUT_PLAN = {
  0: { name: 'The Yoke Block', exercises: {
    warmup: [],
    main: [
      { ...EXERCISE_LIBRARY[13], id: 'w0-e1', sets: 1, reps: 240, weight: 20, rest: 0, note: '4 minutes continuous holding. 100% suffering diverted to traps.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[14], id: 'w0-e2', sets: 3, reps: 60, weight: 0, rest: 60, note: '60 seconds per leg. Barefoot catch.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[15], id: 'w0-e3', sets: 3, reps: 10, weight: 10, rest: 60, note: '3-second hold per rep. Best anti-rotation exercise.', isBodyweight: false },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w0-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  1: { name: 'Kosher Kravi', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w1-e1', sets: 2, reps: 45, weight: 0, rest: 30, note: 'Knee Isometrics (60-deg angle)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[1], id: 'w1-e2', sets: 2, reps: 10, weight: 0, rest: 30, note: 'Contralateral Bird-Dog (per side)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[2], id: 'w1-e3', sets: 2, reps: 10, weight: 5, rest: 30, note: 'Chest-Supported Y-T-W (10 per letter)', isBodyweight: false },
    ],
    main: [],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w1-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  2: { name: 'Heavy Trunk', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w2-e1', sets: 2, reps: 45, weight: 0, rest: 30, note: 'Knee Isometrics (60-deg angle)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[1], id: 'w2-e2', sets: 2, reps: 10, weight: 0, rest: 30, note: 'Contralateral Bird-Dog (per side)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[2], id: 'w2-e3', sets: 2, reps: 10, weight: 5, rest: 30, note: 'Chest-Supported Y-T-W (10 per letter)', isBodyweight: false },
      { ...EXERCISE_LIBRARY[3], id: 'w2-e4', sets: 2, reps: 20, weight: 0, rest: 45, note: 'Banded Face Pulls. Lock the shoulder joint.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[4], id: 'w2-e5', sets: 3, reps: 10, weight: 24, rest: 120, note: 'Anti-rotation on obliques. 1 dumbbell only.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[5], id: 'w2-e6', sets: 4, reps: 10, weight: 32, rest: 90, note: 'Zero spinal shear force.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[6], id: 'w2-e7', sets: 3, reps: 10, weight: 40, rest: 120, note: 'Pure push power. Flat bench.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[7], id: 'w2-e8', sets: 3, reps: 8, weight: 24, rest: 90, note: 'Shock absorption training for dunes.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[8], id: 'w2-e9', sets: 3, reps: 30, weight: 24, rest: 90, note: '30 meters per side.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[9], id: 'w2-e10', sets: 2, reps: 45, weight: 0, rest: 60, note: '45 seconds per side. Replaces crunches.', isBodyweight: true },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w2-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  3: { name: 'Kosher Kravi', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w3-e1', sets: 2, reps: 45, weight: 0, rest: 30, note: 'Knee Isometrics (60-deg angle)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[1], id: 'w3-e2', sets: 2, reps: 10, weight: 0, rest: 30, note: 'Contralateral Bird-Dog (per side)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[2], id: 'w3-e3', sets: 2, reps: 10, weight: 5, rest: 30, note: 'Chest-Supported Y-T-W (10 per letter)', isBodyweight: false },
    ],
    main: [],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w3-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  4: { name: 'Heavy Trunk', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w4-e1', sets: 2, reps: 45, weight: 0, rest: 30, note: 'Knee Isometrics (60-deg angle)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[1], id: 'w4-e2', sets: 2, reps: 10, weight: 0, rest: 30, note: 'Contralateral Bird-Dog (per side)', isBodyweight: true },
      { ...EXERCISE_LIBRARY[2], id: 'w4-e3', sets: 2, reps: 10, weight: 5, rest: 30, note: 'Chest-Supported Y-T-W (10 per letter)', isBodyweight: false },
      { ...EXERCISE_LIBRARY[3], id: 'w4-e4', sets: 2, reps: 20, weight: 0, rest: 45, note: 'Banded Face Pulls. Lock the shoulder joint.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[4], id: 'w4-e5', sets: 3, reps: 10, weight: 24, rest: 120, note: 'Anti-rotation on obliques. 1 dumbbell only.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[5], id: 'w4-e6', sets: 4, reps: 10, weight: 32, rest: 90, note: 'Zero spinal shear force.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[6], id: 'w4-e7', sets: 3, reps: 10, weight: 40, rest: 120, note: 'Pure push power. Flat bench.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[7], id: 'w4-e8', sets: 3, reps: 8, weight: 24, rest: 90, note: 'Shock absorption training for dunes.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[8], id: 'w4-e9', sets: 3, reps: 30, weight: 24, rest: 90, note: '30 meters per side.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[9], id: 'w4-e10', sets: 2, reps: 45, weight: 0, rest: 60, note: '45 seconds per side. Replaces crunches.', isBodyweight: true },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w4-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  5: { name: 'Parasympathetic Reset', exercises: {
    warmup: [],
    main: [
      { ...EXERCISE_LIBRARY[10], id: 'w5-e1', sets: 3, reps: 15, weight: 0, rest: 30, note: 'Strengthen foot arch. Primary shock absorber.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[11], id: 'w5-e2', sets: 3, reps: 10, weight: 0, rest: 60, note: '10m forward, 10m backward. Cross-brain sync.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[12], id: 'w5-e3', sets: 1, reps: 45, weight: 0, rest: 0, note: '40-50 min flat run. HR 135-145. Mitochondrial density.', isBodyweight: true },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w5-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
  6: { name: 'Rest Day', exercises: {
    warmup: [],
    main: [],
    cooldown: [
      { ...EXERCISE_LIBRARY[16], id: 'w6-c1', sets: 3, reps: 10, weight: 0, rest: 10, note: '10 sec hold, 10 sec rest. 10 reps per pos (stand/sit/lie).', isBodyweight: true },
    ],
  }},
};

export const HEATMAP_DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WORKOUT_HISTORY = [
  { id: 'sample-1', date: '2026-04-14', completedAt: '2026-04-14T18:00:00.000Z', day: 2, planName: 'Lower Body Power', durationSeconds: 2700, totalSets: 11, completedSets: [] },
  { id: 'sample-2', date: '2026-04-16', completedAt: '2026-04-16T18:30:00.000Z', day: 4, planName: 'Upper Body Push', durationSeconds: 2400, totalSets: 9, completedSets: [] },
  { id: 'sample-3', date: '2026-04-18', completedAt: '2026-04-18T12:00:00.000Z', day: 6, planName: 'Mobility', durationSeconds: 1500, totalSets: 4, completedSets: [] },
  { id: 'sample-4', date: '2026-04-21', completedAt: '2026-04-21T18:00:00.000Z', day: 2, planName: 'Lower Body Power', durationSeconds: 3000, totalSets: 12, completedSets: [] },
  { id: 'sample-5', date: '2026-04-23', completedAt: '2026-04-23T18:00:00.000Z', day: 4, planName: 'Upper Body Push', durationSeconds: 2550, totalSets: 10, completedSets: [] },
  { id: 'sample-6', date: '2026-04-25', completedAt: '2026-04-25T12:00:00.000Z', day: 6, planName: 'Heavy Legs', durationSeconds: 3300, totalSets: 13, completedSets: [] },
  { id: 'sample-7', date: '2026-04-28', completedAt: '2026-04-28T18:00:00.000Z', day: 2, planName: 'Lower Body Power', durationSeconds: 2850, totalSets: 11, completedSets: [] },
  { id: 'sample-8', date: '2026-04-30', completedAt: '2026-04-30T18:00:00.000Z', day: 4, planName: 'Upper Body Push', durationSeconds: 2500, totalSets: 9, completedSets: [] },
  { id: 'sample-9', date: '2026-05-02', completedAt: '2026-05-02T12:00:00.000Z', day: 6, planName: 'Heavy Legs', durationSeconds: 3450, totalSets: 13, completedSets: [] },
  { id: 'sample-10', date: '2026-05-05', completedAt: '2026-05-05T18:00:00.000Z', day: 2, planName: 'Lower Body Power', durationSeconds: 2950, totalSets: 12, completedSets: [] },
  { id: 'sample-11', date: '2026-05-07', completedAt: '2026-05-07T18:00:00.000Z', day: 4, planName: 'Upper Body Push', durationSeconds: 2600, totalSets: 10, completedSets: [] },
  { id: 'sample-12', date: '2026-05-09', completedAt: '2026-05-09T12:00:00.000Z', day: 6, planName: 'Heavy Legs', durationSeconds: 3500, totalSets: 13, completedSets: [] },
];

export const NUTRITION_DATA = {
  calorieGoal: 2450,
  calorieConsumed: 1820,
  protein: { current: 152, target: 200 },
  carbs: { current: 168, target: 250 },
  fats: { current: 55, target: 70 },
  water: { current: 1250, target: 3000 },
  meals: {
    breakfast: [
      { id: 'm1', name: 'Protein Oats', calories: 420, protein: 35, carbs: 55, fat: 8, checked: true },
      { id: 'm2', name: 'Black Coffee', calories: 5, protein: 0, carbs: 1, fat: 0, checked: true },
    ],
    lunch: [
      { id: 'm3', name: 'Grilled Chicken Bowl', calories: 580, protein: 52, carbs: 48, fat: 16, checked: true },
    ],
    dinner: [
      { id: 'm4', name: 'Salmon & Sweet Potato', calories: 620, protein: 45, carbs: 52, fat: 22, checked: true },
    ],
    snacks: [
      { id: 'm5', name: 'Greek Yogurt', calories: 195, protein: 20, carbs: 12, fat: 9, checked: true },
    ],
  },
  groceryList: [
    { id: 'g1', name: 'Grass-fed Ribeye', qty: '1.5 lbs', category: 'Meat', checked: false },
    { id: 'g2', name: 'Electrolyte Powder', qty: '2 tubs', category: 'Supplements', checked: false },
    { id: 'g3', name: 'Avocados', qty: '4 units', category: 'Produce', checked: true },
    { id: 'g4', name: 'Almond Butter', qty: '1 jar', category: 'Pantry', checked: true },
    { id: 'g5', name: 'Chicken Breast', qty: '2 lbs', category: 'Meat', checked: false },
    { id: 'g6', name: 'Brown Rice', qty: '1 bag', category: 'Pantry', checked: false },
  ],
};

export const RECORDS_DATA = {
  insight: {
    title: 'SYSTEM INSIGHT',
    message: 'Great job! Your heavy squat trend is improving. Estimated 1RM up 4% this microcycle.',
  },
  benchmarks: [
    { label: '3000m Run', value: '14:30', unit: 'TIME', trend: '-1.5% vs last month', positive: true,
      history: [
        { value: 960, date: '2026-02-10' },
        { value: 930, date: '2026-03-01' },
        { value: 900, date: '2026-03-20' },
        { value: 885, date: '2026-04-12' },
        { value: 870, date: '2026-05-01' },
      ]},
    { label: 'Max Pull-Ups', value: 12, unit: 'REPS', trend: '+5.0% vs last month', positive: true,
      history: [
        { value: 8, date: '2026-02-15' },
        { value: 9, date: '2026-03-05' },
        { value: 10, date: '2026-03-28' },
        { value: 11, date: '2026-04-18' },
        { value: 12, date: '2026-05-05' },
      ]},
    { label: 'Bench Press 1RM', value: 100, unit: 'KG', trend: '+8.1%', positive: true,
      history: [
        { value: 85, date: '2026-02-01' },
        { value: 90, date: '2026-02-28' },
        { value: 92.5, date: '2026-03-15' },
        { value: 97.5, date: '2026-04-10' },
        { value: 100, date: '2026-05-02' },
      ]},
    { label: 'Back Squat 1RM', value: 120, unit: 'KG', trend: '+4.2%', positive: true,
      history: [
        { value: 100, date: '2026-01-20' },
        { value: 105, date: '2026-02-18' },
        { value: 110, date: '2026-03-12' },
        { value: 115, date: '2026-04-08' },
        { value: 120, date: '2026-05-01' },
      ]},
    { label: 'Deadlift 1RM', value: 140, unit: 'KG', trend: '-2.1%', positive: false,
      history: [
        { value: 145, date: '2026-02-05' },
        { value: 142.5, date: '2026-03-01' },
        { value: 140, date: '2026-03-25' },
        { value: 142.5, date: '2026-04-15' },
        { value: 140, date: '2026-05-03' },
      ]},
  ],
  workCapacity: { value: 42, unit: 'MIN', status: 'Optimal zone' },
  weeklyVolume: [12400, 14200, 11800, 15600, 13200, 16800, 14500],
};

export const QUICK_LOG_DEFAULTS = {
  water: 1,
  protein: 1,
  logged: 1,
  workout: 0,
};
