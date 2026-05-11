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
