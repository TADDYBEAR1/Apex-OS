/**
 * Inverse of planParser: serializes the current workoutPlan back to the
 * importable Markdown format — full round-trip for sharing and backups.
 */
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SECTIONS = [
  ['warmup', 'Warmup'],
  ['main', 'Main'],
  ['cooldown', 'Cooldown'],
];

function exerciseToLine(ex) {
  const parts = [ex.name];
  const reps = ex.reps === 0 ? 'AMRAP' : ex.reps;
  parts.push(`${ex.sets}x${reps}`);
  if (ex.isBodyweight || !ex.weight) parts.push('bodyweight');
  else parts.push(`${ex.weight}kg`);
  if (ex.rest != null) parts.push(`rest ${ex.rest}`);
  if (ex.note) parts.push(`note: ${ex.note}`);
  return `- ${parts.join(' | ')}`;
}

export function exportPlanToMarkdown(workoutPlan, planName = 'Apex Plan') {
  const lines = [`# ${planName}`, ''];

  workoutPlan.forEach((day, index) => {
    if (!day || !day.name || day.name === 'Rest Day') return;
    const hasExercises = SECTIONS.some(([key]) => (day.exercises?.[key] || []).length > 0);
    if (!hasExercises) return;

    lines.push(`## ${DAY_NAMES[index]} — ${day.name}`);
    SECTIONS.forEach(([key, label]) => {
      const items = day.exercises?.[key] || [];
      if (!items.length) return;
      lines.push(`### ${label}`);
      items.forEach(ex => lines.push(exerciseToLine(ex)));
    });
    lines.push('');
  });

  return lines.join('\n');
}
