// Apex OS — Sample Data
// Pre-populated workout, nutrition, and records data

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export const EXERCISE_LIBRARY = [
  { id: 'e1', name: 'Arm Swings', category: 'Shoulders', image: null, defaultSets: 2, defaultReps: 20, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
  { id: 'e2', name: 'Hip Circles', category: 'Core', image: null, defaultSets: 2, defaultReps: 15, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
  { id: 'e3', name: 'Barbell Back Squat', category: 'Legs', image: null, defaultSets: 5, defaultReps: 5, defaultWeight: 100, defaultRest: 180, isBodyweight: false },
  { id: 'e4', name: 'Incline Dumbbell Press', category: 'Chest', image: null, defaultSets: 3, defaultReps: 10, defaultWeight: 34, defaultRest: 90, isBodyweight: false },
  { id: 'e5', name: 'Bent Over Row', category: 'Back', image: null, defaultSets: 4, defaultReps: 8, defaultWeight: 60, defaultRest: 90, isBodyweight: false },
  { id: 'e6', name: 'Lateral Raises', category: 'Shoulders', image: null, defaultSets: 3, defaultReps: 15, defaultWeight: 10, defaultRest: 60, isBodyweight: false },
  { id: 'e7', name: 'Foam Rolling', category: 'Core', image: null, defaultSets: 1, defaultReps: 10, defaultWeight: 0, defaultRest: 0, isBodyweight: true },
  { id: 'e8', name: 'Tricep Dips', category: 'Arms', image: null, defaultSets: 3, defaultReps: 12, defaultWeight: 0, defaultRest: 60, isBodyweight: true },
  { id: 'e9', name: 'Bicep Curls', category: 'Arms', image: null, defaultSets: 3, defaultReps: 12, defaultWeight: 14, defaultRest: 60, isBodyweight: false },
  { id: 'e10', name: 'Deadlift', category: 'Legs', image: null, defaultSets: 5, defaultReps: 3, defaultWeight: 140, defaultRest: 180, isBodyweight: false },
  { id: 'e11', name: 'Pull Ups', category: 'Back', image: null, defaultSets: 4, defaultReps: 8, defaultWeight: 0, defaultRest: 90, isBodyweight: true },
  { id: 'e12', name: 'Plank Hold', category: 'Core', image: null, defaultSets: 3, defaultReps: 60, defaultWeight: 0, defaultRest: 30, isBodyweight: true },
];

export const DEFAULT_WORKOUT_PLAN = {
  0: { name: 'Recovery Flow', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w0-e1', sets: 2, reps: 20, weight: 0, rest: 30, note: 'Open the shoulders before recovery work.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[1], id: 'w0-e2', sets: 2, reps: 15, weight: 0, rest: 30, note: 'Loosen up the hip flexors.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[6], id: 'w0-e3', sets: 1, reps: 10, weight: 0, rest: 0, note: 'Focus on tight areas from the week.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[11], id: 'w0-e4', sets: 3, reps: 60, weight: 0, rest: 30, note: 'Core stability and breathing.', isBodyweight: true },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[1], id: 'w0-e5', name: 'Static Stretch', sets: 1, reps: 10, weight: 0, rest: 0, note: 'Hold each stretch 30 seconds.', isBodyweight: true },
    ],
  }},
  1: { name: 'Upper Body Push', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w1-e1', sets: 2, reps: 20, weight: 0, rest: 30, note: 'Get blood flowing to the shoulders.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[3], id: 'w1-e2', sets: 3, reps: 10, weight: 34, rest: 90, note: 'Control the negative and keep elbows stacked.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[5], id: 'w1-e3', sets: 3, reps: 15, weight: 10, rest: 60, note: 'Slight bend in elbows, slow eccentric.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[7], id: 'w1-e4', sets: 3, reps: 12, weight: 0, rest: 60, note: 'Full range of motion, lock out at top.', isBodyweight: true },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[6], id: 'w1-e5', name: 'Upper Body Stretch', sets: 1, reps: 5, weight: 0, rest: 0, note: 'Focus on chest and shoulders.', isBodyweight: true },
    ],
  }},
  2: { name: 'Lower Body Power', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[1], id: 'w2-e1', sets: 2, reps: 15, weight: 0, rest: 30, note: 'Activate the glutes and hips.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[2], id: 'w2-e2', sets: 5, reps: 5, weight: 100, rest: 180, note: 'Brace hard. Drive through the heels.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[9], id: 'w2-e3', sets: 5, reps: 3, weight: 140, rest: 180, note: 'Hinge at the hips. Flat back.', isBodyweight: false },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[6], id: 'w2-e4', name: 'Leg Foam Roll', sets: 1, reps: 10, weight: 0, rest: 0, note: 'Quads, hamstrings, calves.', isBodyweight: true },
    ],
  }},
  3: { name: 'Pull & Back', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w3-e1', sets: 2, reps: 20, weight: 0, rest: 30, note: 'Warm up the rotator cuff.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[4], id: 'w3-e2', sets: 4, reps: 8, weight: 60, rest: 90, note: 'Pull to the navel. Squeeze the lats.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[10], id: 'w3-e3', sets: 4, reps: 8, weight: 0, rest: 90, note: 'Dead hang start. Chin over bar.', isBodyweight: true },
      { ...EXERCISE_LIBRARY[8], id: 'w3-e4', sets: 3, reps: 12, weight: 14, rest: 60, note: 'No swinging. Control the weight.', isBodyweight: false },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[6], id: 'w3-e5', name: 'Back Stretch', sets: 1, reps: 8, weight: 0, rest: 0, note: 'Cat-cow and child pose.', isBodyweight: true },
    ],
  }},
  4: { name: 'Upper Body Push', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[0], id: 'w4-e1', sets: 2, reps: 20, weight: 0, rest: 30, note: 'Dynamic shoulder warm-up.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[3], id: 'w4-e2', sets: 4, reps: 8, weight: 36, rest: 90, note: 'Progressive overload from Monday.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[5], id: 'w4-e3', sets: 4, reps: 12, weight: 12, rest: 60, note: 'Light and controlled.', isBodyweight: false },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[6], id: 'w4-e5', name: 'Cooldown Stretch', sets: 1, reps: 10, weight: 0, rest: 0, note: 'Full body wind down.', isBodyweight: true },
    ],
  }},
  5: { name: 'Heavy Legs', exercises: {
    warmup: [
      { ...EXERCISE_LIBRARY[1], id: 'w5-e1', sets: 3, reps: 15, weight: 0, rest: 30, note: 'Extra warm-up for heavy day.', isBodyweight: true },
    ],
    main: [
      { ...EXERCISE_LIBRARY[2], id: 'w5-e2', sets: 5, reps: 3, weight: 120, rest: 240, note: 'Max effort triples. Belt up.', isBodyweight: false },
      { ...EXERCISE_LIBRARY[9], id: 'w5-e3', sets: 3, reps: 5, weight: 160, rest: 180, note: 'Top set. Mixed grip allowed.', isBodyweight: false },
    ],
    cooldown: [
      { ...EXERCISE_LIBRARY[11], id: 'w5-e4', sets: 3, reps: 45, weight: 0, rest: 30, note: 'Core stability finisher.', isBodyweight: true },
    ],
  }},
  6: { name: 'Rest Day', exercises: {
    warmup: [],
    main: [],
    cooldown: [],
  }},
};

export const HEATMAP_DATA = [
  [1,0,2,1,0,3,0], [0,2,0,1,3,0,1], [1,0,0,2,0,1,0],
  [2,3,0,0,1,0,2], [0,0,1,3,0,2,0], [1,2,0,0,0,1,3],
];

export const NUTRITION_DATA = {
  calorieGoal: 2450,
  calorieConsumed: 1820,
  protein: { current: 180, target: 200 },
  carbs: { current: 210, target: 250 },
  fats: { current: 55, target: 70 },
  meals: {
    breakfast: [
      { id: 'm1', name: 'Protein Oats', calories: 420, protein: 35, carbs: 55, fat: 8 },
      { id: 'm2', name: 'Black Coffee', calories: 5, protein: 0, carbs: 1, fat: 0 },
    ],
    lunch: [
      { id: 'm3', name: 'Grilled Chicken Bowl', calories: 580, protein: 52, carbs: 48, fat: 16 },
    ],
    dinner: [
      { id: 'm4', name: 'Salmon & Sweet Potato', calories: 620, protein: 45, carbs: 52, fat: 22 },
    ],
    snacks: [
      { id: 'm5', name: 'Greek Yogurt', calories: 195, protein: 20, carbs: 12, fat: 9 },
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
    { label: 'BACK SQUAT (1RM)', value: 185, unit: 'KG', trend: '+2.5% vs last month', positive: true },
    { label: 'BENCH PRESS (1RM)', value: 105, unit: 'KG', trend: '+1.2% vs last month', positive: true },
    { label: 'DEADLIFT (1RM)', value: 220, unit: 'KG', trend: '−0.5% vs last month', positive: false },
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
