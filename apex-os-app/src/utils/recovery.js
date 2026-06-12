/**
 * Built-in recovery session for red-gate days: zero impact, zero heavy
 * loading — isometrics, mobility and blood flow only. Offered in place of
 * the planned workout when the morning check-in comes back red.
 */
export const RECOVERY_SESSION = {
  name: 'Recovery Protocol · Red Gate',
  exercises: [
    { id: 'rec-1', name: 'Knee Isometrics (Wall Sit, Easy)', sets: 3, reps: 30, weight: 0, rest: 60, isBodyweight: true, image: null, note: 'Pain must stay ≤2/10 — stop if it climbs' },
    { id: 'rec-2', name: 'Glute Bridge (Slow)', sets: 3, reps: 12, weight: 0, rest: 45, isBodyweight: true, image: null, note: 'Pain-free range only' },
    { id: 'rec-3', name: 'Bird-Dog', sets: 3, reps: 8, weight: 0, rest: 45, isBodyweight: true, image: null, note: 'Per side, slow and controlled' },
    { id: 'rec-4', name: 'Cat-Cow + Hip Flexor Stretch', sets: 2, reps: 10, weight: 0, rest: 30, isBodyweight: true, image: null, note: 'Gentle spinal motion' },
    { id: 'rec-5', name: 'Tibialis Raises (Light)', sets: 2, reps: 12, weight: 0, rest: 30, isBodyweight: true, image: null },
    { id: 'rec-6', name: 'Easy Walk or Spin', sets: 1, reps: 15, weight: 0, rest: 0, isBodyweight: true, image: null, note: '15 min blood flow, conversational pace' },
  ],
};
