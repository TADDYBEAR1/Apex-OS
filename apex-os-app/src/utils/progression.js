/**
 * Double-progression coach: when the athlete has hit every target rep
 * (at target weight) in the last two logged sessions of an exercise,
 * the app suggests the next load step — straight from the program.
 */
function sessionHitsAllTargets(sets) {
  if (!sets.length) return false;
  return sets.every(s =>
    (s.actualReps ?? 0) >= (s.targetReps ?? 0) &&
    (s.isBodyweight || (s.actualWeight ?? 0) >= (s.targetWeight ?? 0))
  );
}

export function getProgressionHint(workoutHistory = [], exercise) {
  if (!exercise) return null;

  const matchKey = exercise.name;
  const relevantSessions = workoutHistory
    .map(session => ({
      completedAt: session.completedAt,
      sets: (session.completedSets || []).filter(s => s.exerciseName === matchKey),
    }))
    .filter(s => s.sets.length > 0)
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1)); // newest first

  if (relevantSessions.length === 0) return null;

  let cleanStreak = 0;
  for (const session of relevantSessions) {
    if (sessionHitsAllTargets(session.sets)) cleanStreak += 1;
    else break;
    if (cleanStreak >= 2) break;
  }

  if (cleanStreak >= 2) {
    if (exercise.isBodyweight) {
      const nextReps = (exercise.reps || 0) + 1;
      return {
        level: 'up',
        message: `Two clean sessions logged. Level up: try ${nextReps}+ reps per set today.`,
        patch: { field: 'reps', value: nextReps },
      };
    }
    const nextWeight = (exercise.weight || 0) + 2.5;
    return {
      level: 'up',
      message: `Two clean sessions at ${exercise.weight}kg. Level up: load ${nextWeight}kg today.`,
      patch: { field: 'weight', value: nextWeight },
    };
  }

  if (cleanStreak === 1) {
    return {
      level: 'almost',
      message: 'Last session was clean. One more full-target session unlocks the next load.',
    };
  }

  return null;
}
