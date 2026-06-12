/**
 * Markdown training-plan importer.
 *
 * Turns a structured .md file into the app's workoutPlan shape, so a full
 * week of training is loaded in seconds instead of typed exercise-by-exercise.
 *
 * Format (Hebrew or English, forgiving):
 *
 *   # Plan Name                          (optional)
 *   ## Sunday — Upper Body A             (## day — title; Hebrew: ## יום ראשון — ...)
 *   ### Warmup                           (### section: Warmup/Main/Cooldown | חימום/עיקרי/שחרור)
 *   - Exercise Name | 3x10 | 24kg | rest 90 | note: optional free text
 *   - Pull-Ups | 4xAMRAP | bodyweight | rest 120
 *   - Side Plank | 2x45s | rest 60
 *
 * Lines that cannot be parsed are returned as warnings — nothing fails silently.
 */

const DAY_LOOKUP = {
  sunday: 0, sun: 0, 'יום ראשון': 0, 'ראשון': 0, "יום א'": 0, 'יום א': 0,
  monday: 1, mon: 1, 'יום שני': 1, 'שני': 1, "יום ב'": 1, 'יום ב': 1,
  tuesday: 2, tue: 2, tues: 2, 'יום שלישי': 2, 'שלישי': 2, "יום ג'": 2, 'יום ג': 2,
  wednesday: 3, wed: 3, 'יום רביעי': 3, 'רביעי': 3, "יום ד'": 3, 'יום ד': 3,
  thursday: 4, thu: 4, thur: 4, thurs: 4, 'יום חמישי': 4, 'חמישי': 4, "יום ה'": 4, 'יום ה': 4,
  friday: 5, fri: 5, 'יום שישי': 5, 'שישי': 5, "יום ו'": 5, 'יום ו': 5,
  saturday: 6, sat: 6, 'יום שבת': 6, 'שבת': 6,
};

const SECTION_LOOKUP = {
  warmup: 'warmup', 'warm-up': 'warmup', 'warm up': 'warmup', 'חימום': 'warmup',
  main: 'main', 'main workout': 'main', 'עיקרי': 'main', 'אימון עיקרי': 'main', 'עיקר': 'main',
  cooldown: 'cooldown', 'cool-down': 'cooldown', 'cool down': 'cooldown', 'שחרור': 'cooldown', 'הרפיה': 'cooldown',
};

function normalize(text) {
  return text.trim().toLowerCase().replace(/[״”"]/g, "'");
}

function matchDay(heading) {
  // "Sunday — Upper Body A" / "יום ראשון - פלג עליון" / "Sunday: ..."
  const split = heading.split(/[—\-–:|]/);
  const dayToken = normalize(split[0]);
  if (dayToken in DAY_LOOKUP) {
    const title = split.slice(1).join('-').trim();
    return { day: DAY_LOOKUP[dayToken], title: title || null };
  }
  // Heading might be just the day name
  if (normalize(heading) in DAY_LOOKUP) {
    return { day: DAY_LOOKUP[normalize(heading)], title: null };
  }
  return null;
}

function parseExerciseLine(line, lineNumber) {
  const raw = line.replace(/^[-*•]\s*/, '').trim();
  if (!raw) return { exercise: null };

  const parts = raw.split('|').map(p => p.trim()).filter(Boolean);
  if (parts.length === 0) return { exercise: null };

  const name = parts[0];
  if (!name) return { warning: `Line ${lineNumber}: missing exercise name` };

  let sets = 3;
  let reps = 10;
  let weight = 0;
  let rest = 60;
  let isBodyweight = true;
  let foundSetsReps = false;
  const noteParts = [];

  for (const part of parts.slice(1)) {
    const p = part.trim();
    const lower = normalize(p);

    // note: free text
    const noteMatch = p.match(/^(?:note|הערה)\s*:\s*(.+)$/i);
    if (noteMatch) { noteParts.push(noteMatch[1].trim()); continue; }

    // 3x10 / 4×8 / 2x45s / 4xAMRAP
    const setsRepsMatch = lower.match(/^(\d+)\s*[x×]\s*(\d+|amrap|max)\s*(s|sec|שנ)?\s*$/);
    if (setsRepsMatch) {
      sets = parseInt(setsRepsMatch[1], 10);
      if (setsRepsMatch[2] === 'amrap' || setsRepsMatch[2] === 'max') {
        reps = 0;
        noteParts.push('AMRAP — max clean reps each set');
      } else {
        reps = parseInt(setsRepsMatch[2], 10);
        if (setsRepsMatch[3]) noteParts.push('Duration in seconds');
      }
      foundSetsReps = true;
      continue;
    }

    // rest 90 / rest: 90s / מנוחה 90
    const restMatch = lower.match(/^(?:rest|מנוחה)\s*:?\s*(\d+)\s*(?:s|sec|שנ|שניות)?$/);
    if (restMatch) { rest = parseInt(restMatch[1], 10); continue; }

    // bodyweight / BW / משקל גוף
    if (lower === 'bodyweight' || lower === 'bw' || lower === 'משקל גוף') {
      weight = 0; isBodyweight = true; continue;
    }

    // 24kg / 12.5 kg / 24 ק"ג (per-hand weights like "2x12kg" stay in notes)
    const weightMatch = lower.match(/^(\d+(?:\.\d+)?)\s*(?:kg|ק'ג|קג|ק\u0022ג)$/) || lower.match(/^(\d+(?:\.\d+)?)\s*(?:kg|קג)\b/);
    if (weightMatch) { weight = parseFloat(weightMatch[1]); isBodyweight = weight === 0; continue; }

    // Anything else → note
    noteParts.push(p);
  }

  const exercise = {
    name,
    sets,
    reps,
    weight,
    rest,
    isBodyweight,
    image: null,
    note: noteParts.length ? noteParts.join(' · ') : undefined,
  };
  return { exercise, warning: foundSetsReps ? null : `Line ${lineNumber}: "${name}" — no sets×reps found, used 3x10 default` };
}

/**
 * @returns {{ planName: string|null, days: Object<number,{name:string,exercises:{warmup:[],main:[],cooldown:[]}}>, warnings: string[], exerciseCount: number }}
 */
export function parsePlanMarkdown(markdown) {
  // Strip HTML comment blocks (used for format guides inside plan files)
  const cleaned = markdown.replace(/<!--[\s\S]*?-->/g, '');
  const lines = cleaned.replace(/\r\n/g, '\n').split('\n');
  const days = {};
  const warnings = [];
  let planName = null;
  let currentDay = null;
  let currentSection = 'main';
  let exerciseCount = 0;
  let idCounter = 0;

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    const lineNumber = idx + 1;
    if (!line) return;

    if (line.startsWith('# ') && !line.startsWith('## ')) {
      planName = planName || line.slice(2).trim();
      return;
    }

    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const heading = line.slice(3).trim();
      const match = matchDay(heading);
      if (match) {
        currentDay = match.day;
        currentSection = 'main';
        if (!days[currentDay]) {
          days[currentDay] = {
            name: match.title || heading,
            exercises: { warmup: [], main: [], cooldown: [] },
          };
        }
      } else {
        warnings.push(`Line ${lineNumber}: day heading not recognized — "${heading}"`);
        currentDay = null;
      }
      return;
    }

    if (line.startsWith('### ')) {
      const sectionName = normalize(line.slice(4));
      if (sectionName in SECTION_LOOKUP) {
        currentSection = SECTION_LOOKUP[sectionName];
      } else {
        warnings.push(`Line ${lineNumber}: section not recognized — "${line.slice(4).trim()}" (using Main)`);
        currentSection = 'main';
      }
      return;
    }

    if (/^[-*•]\s/.test(line)) {
      if (currentDay === null) {
        warnings.push(`Line ${lineNumber}: exercise found before any day heading — skipped`);
        return;
      }
      const { exercise, warning } = parseExerciseLine(line, lineNumber);
      if (warning) warnings.push(warning);
      if (exercise) {
        idCounter += 1;
        exercise.id = `imp-${currentDay}-${idCounter}`;
        days[currentDay].exercises[currentSection].push(exercise);
        exerciseCount += 1;
      }
    }
  });

  return { planName, days, warnings, exerciseCount, dayCount: Object.keys(days).length };
}

/**
 * Merges parsed days into an existing 7-day plan: only days present in the
 * file are replaced; all other days keep their current content.
 */
export function mergeParsedPlan(existingPlan, parsed) {
  return existingPlan.map((day, index) => (parsed.days[index] ? parsed.days[index] : day));
}
