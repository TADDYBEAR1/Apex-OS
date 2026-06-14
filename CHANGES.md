# Apex-OS V3.0 — "Arctic Aurora" Design System

מהפך ויזואלי מלא: מ-pure-black + neon-cyan ל-**Arctic Aurora** — קנבס קרחוני עמוק, שדה זוהר חי, זכוכית מטושטשת, וכחול-קרח אירידיסנטי כצבע סיגנל יחיד.

## 🎨 טוקנים (index.css)
כל בלוק ה-`:root` הוחלף לערכי Arctic Aurora המדויקים מה-design system: `--bg:#070A10`, זכוכית עם מילוי 6% וגבול עליון מואר (22%), `--ice:#7FC8FF` + `--ice-gradient`, אמבר (`#FFB14D`) ומנטה (`#7CFFD9`) כאקצנטים, ופלטת רמזור חדשה (`--signal-go/caution/stop`). שמות הטוקנים זהים — כל הקומפוננטות קיבלו את הסקין מיידית.

## 🌌 שדה הזוהר (Aurora field)
שלושה blobs מטושטשים (גלאשייר-ציאן, פריוונקל, פרוסט) נעים לאט מאחורי כל מסך — `#root::before/::after` + `.aurora-accent`. מכבדים `prefers-reduced-motion`. התוכן צף מעל ב-`z-index:1`.

## 🧊 זכוכית מטושטשת אמיתית
`.glass` חזר למילוי + `blur(20px)` + גבול עליון מואר + צל ריחוף (`0 24px 60px`). ריחוף מתחמם לכחול-קרח. ה-progress fill קיבל גרדיאנט קרח אירידיסנטי (בלי הסגול הישן).

## ⭕ טבעת ה-Readiness — אלמנט החתימה (ReadinessRing.jsx חדש)
הטבעת המעגלית עם קשת גרדיאנט-קרח היא עכשיו הגיבור של Mission Control ושל צ'ק-אין הבוקר. מודעת-רמזור: ירוק=קרח, צהוב=אמבר, אדום=ורוד. במסך הבית היא הופכת לכרטיס הראשי עם הציון במרכז; בצ'ק-אין היא תצוגה חיה שמתעדכנת תוך כדי הזזת הסליידרים.

## 🔵 סקין רוחבי
כל 20 הקומפוננטות עברו סריקה: neon-cyan (`#00e5ff`) ו-mint-cyan (`#00FFCC`) הישנים → כחול-קרח (`#7FC8FF`) בכל ה-hex וה-rgba. theme-color וה-status bar → `#070A10`.

## 📦 ה-design system בפנים
`apex-os-app/design-system/` — הטוקנים, הקומפוננטות, וה-UI kit, לשימוש עתידי כ-skill.

---

# Apex-OS V2.5 — "Foundations" — שכבות 2+3

## 🪟 דיאלוגים פנימיים (`AppDialog.jsx` חדש)
כל הזרימות המרכזיות עברו מ-window.confirm המכוער לדיאלוג בשפת ה-Glass: יציאה מאימון (Back), שער אדום (עם שתי תוצאות אמיתיות: Recovery / Plan Anyway), סיום מוקדם ב-Focus, ייבוא תוכנית (כולל תצוגת אזהרות), וייבוא גיבוי. כפתור Back סוגר דיאלוג פתוח קודם.
*נשארו ב-window.confirm:* שלוש מחיקות (Records/Fuel/History) — מכוסות בבדיקות קיימות שמדמות confirm; הוסבו = שבירת בדיקות שאי אפשר להריץ בסביבת הפיתוח הזו. מסומן כהמשך.

## 📚 ספריית תוכניות + ייצוא (.md)
- **SAVE SNAPSHOT** — שומר את השבוע הנוכחי לספרייה (עד 12), **LOAD** משחזר עם אזהרה.
- **EXPORT .MD** (`utils/planExporter.js` חדש) — מייצא את התוכנית הנוכחית לפורמט הייבוא. **Round-trip מאומת בבדיקה**: ייצוא ← ייבוא ללא אובדן (כולל AMRAP).
- מיגרציית סכמה **v10**: `planLibrary` + `reminder`.

## ⏰ תזכורת בוקר (`utils/notifications.js` חדש)
Profile → Mission: טוגל + שעה ⇒ התראה יומית "Morning Check-In" דרך Local Notifications. דורש `npm install` (נוספה תלות `@capacitor/local-notifications`) + `cap sync`; בדפדפן נופל בחן עם הודעה.

## 🧪 בדיקות לחמשת המנועים — 24 בדיקות חדשות
`planParser` (6) · `readiness` (5) · `mission` (4) · `progression` (5) · `planExporter` round-trip (2) + storage. מכסות את ספי הרמזור מהתוכנית, עברית בפרסר, דאבל-פרוגרסיה, וקצוות תאריכים.

## ⚙️ ESLint + CI
- `eslint.config.js` (flat, eslint 9 + react-hooks) + `npm run lint`; devDependencies נוספו.
- `.github/workflows/ci.yml`: **lint → vitest → build** על כל push — מהיום שום רגרסיה לא עוברת בשקט.

## 📖 README אמיתי + ניקיון
README מלא (פיצ'רים, התקנה, אנדרואיד, פורמט תוכניות, מבנה פרויקט); `test-results/` ו-`playwright-report/` נוספו ל-gitignore.

## מה נדחה במודע
עברית/RTL מלאה — דורשת תרגום כל המסכים ואימות פריסה על מכשיר רץ; לא אחראי לבצע בלי יכולת להריץ. נשאר ראשון בתור לסבב שאחרי שתריץ ותאשר שהכול יציב.

---

# Apex-OS V2.4 — "Closed Loops" — שכבה 1

המערכת עכשיו **מגיבה** לדאטה שהיא אוספת, לא רק שומרת אותו.

## 🚦 אימון אדפטיבי לפי רמזור
- **יום צהוב** ⇒ באנר 🟡 קבוע בתוך Focus Mode: שמור נפח, הורד עצימות באזור הרגיש, עצור תרגיל אם הכאב מטפס.
- **יום אדום** ⇒ בלחיצת START האפליקציה מציעה להחליף את האימון ב-**Recovery Protocol** מובנה (`utils/recovery.js`): 6 תחנות ללא אימפקט וללא עומס — איזומטרי ברך, גשר עכוז, Bird-Dog, מוביליות, טיביאליס, הליכה קלה. אפשר לסרב ולהמשיך בתוכנית.

## 📈 APPLY — הפרוגרסיה מבצעת את עצמה
צ'יפ ה-Progression Coach קיבל כפתור **APPLY**: לחיצה אחת מעדכנת את המשקל (או החזרות בתרגילי משקל גוף) **גם בסשן החי וגם בתוכנית השמורה** — השבוע הבא מתחיל אוטומטית מהעומס החדש. (`progression.js` מחזיר עכשיו patch מובנה.)

## 📊 מסך Trends — לוח השריון (Records)
פאנל חדש בראש מסך Records (`TrendsPanel.jsx` + `TrendChart.jsx`): ארבעה גרפים בטווחים 14/28/90 יום —
- **VAS ברך** ו-**VAS גב** (צ'ק-אין בוקר + דיווחי סוף-אימון משולבים)
- **Readiness** לאורך זמן
- **משקל גוף** עם רצועת היעד **‎+0.2–0.3 ק"ג/שבוע** מצוירת על הגרף
- רישום משקל: עריכת שדה Weight בפרופיל מזינה אוטומטית את יומן המגמה (`weightLog`, מיגרציית סכמה v9).

## 🎯 עורך משימה (Profile → Mission)
שם היעד ותאריך ה-D-Day ניתנים לעריכה מהממשק — הספירה לאחור ופס הקמפיין מתעדכנים מיד. תאריך היומ"ס יזוז? שתי לחיצות.

## 📋 דוח שבועי v2
נוספו: **אחוז ביצוע מול מתוכנן** (אימונים שבוצעו / ימי אימון בתוכנית), כיסוי צ'ק-אינים, **שינה ממוצעת עם רמזור**, ו-Readiness ממוצע. הדוח עכשיו מספר את כל הסיפור שהמאמן צריך.

---

# Apex-OS V2.3 — Plan Import & Polish

## 📥 ייבוא תוכנית מקובץ MD (`utils/planParser.js` חדש + WorkoutScreen)
מסך Workout → **IMPORT PLAN FROM .MD FILE**: בוחרים קובץ, רואים סיכום (ימים, תרגילים, אזהרות), מאשרים — וכל השבוע נטען: שם תרגיל, סטים, חזרות, משקל, מנוחה, הערות, מחולק ל-Warmup/Main/Cooldown. ימים שלא בקובץ לא נדרסים.
- פורמט: `## Sunday — Upper A` (גם בעברית: `## יום ראשון — ...`), `### Warmup/Main/Cooldown` (חימום/עיקרי/שחרור), שורות `- שם | 3x10 | 24kg | rest 90 | note: ...`. תומך AMRAP, שניות (45s), bodyweight.
- שורות שלא נקראו ⇒ אזהרה מפורשת בדיאלוג — שום דבר לא נכשל בשקט.
- **קובץ דוגמה מוכן**: `apex-os-app/plans/apex-plan-example.md` — שלושה ימי בלוק 1 (Upper A · Upper B · Speed) בפורמט הנכון, ערוך אותו לתוכנית שלך וייבא.

## 🗑 הוסר: RESET TO APEX V6 PROTOCOL
הכפתור האדום שדרס את כל השבוע — נמחק (במקומו כפתור הייבוא).

## 🧊 בוטל אפקט העיקום
- `ParallaxCard` שוכתב: אין יותר הטיית 3D/glare בריחוף — כרטיסים יציבים לחלוטין.
- `index.css`: הוסרו `translateY`/`scale` מ-hover ו-active של כרטיסים וכפתורים, ואנימציית ה"נשימה" המתמדת. אפקטי הזוהר נשארו.

---

# Apex-OS V2.2 — "Mission Control" — Upgrade Changelog
### 11.6.2026 · שני סבבים: תיקוני יסוד (V2.1) + מהפך המוצר (V2.2)

---

# 🎖️ V2.2 — MISSION CONTROL: המהפך

הרעיון: לא עוד יומן אימונים — **חדר מבצעים של הקמפיין ליום סיירות**. שלוש שכבות שעוטפות כל יום: לפני (Readiness), בזמן (Coach), אחרי (Debrief).

## מסך הבית ⇒ Mission Briefing (`HomeScreen.jsx` — שוכתב)
- **ספירה לאחור D-XXX** ליומ"ס (ברירת מחדל 1.10.2026), עם תווית המשימה.
- **מפת הקמפיין**: פס התקדמות עם 6 הפאזות מהתוכנית — Bagrut Bridge → Transition → Block 1 Build → Block 2 Impact → Block 3 Convert → Taper — הפאזה הנוכחית מודגשת + Week X/Y בתוך הבלוק.
- **שער Readiness יומי**: כרטיס צ'ק-אין שהופך לתצוגת רמזור אחרי הדיווח.
- **שער אדום**: אם הבוקר אדום — כרטיס האימון של היום ננעל ויזואלית ("MISSION ON HOLD") ומפנה לעבודת התאוששות.

## צ'ק-אין בוקר (`MorningCheckin.jsx` — חדש, `utils/readiness.js` — חדש)
20 שניות כל בוקר: שינה (0–12h) · VAS ברך · VAS גב · אנרגיה (1–5) ⇒ **ציון Readiness ‏0–100 + רמזור** (🟢/🟡/🔴) עם המלצת פעולה — הרמזור מהתוכנית (v2.3) מקודד: אדום = VAS ‏5+, צהוב = VAS ‏3–4 או שינה <6. תצוגה חיה תוך כדי הזזת הסליידרים. נשמר פר-יום (`checkins[date]`).

## ציר המשימה (`utils/mission.js` — חדש)
תאריכי הבלוקים מהתוכנית האמיתית; מחשב ימים ליעד, פאזה נוכחית, שבוע בפאזה, אחוז התקדמות קמפיין. ה-target ניתן להחלפה בעתיד דרך `state.mission`.

## Focus Mode ⇒ חוויית אימון חיה (`FocusMode.jsx`)
- **שעון סשן חי** בראש המסך (מבוסס timestamp — שורד רקע).
- **Progression Coach** (`utils/progression.js` — חדש): דאבל-פרוגרסיה מהתוכנית, מקודדת — שני סשנים נקיים (כל הסטים ביעד) ⇒ צ'יפ 📈 "Level up: load Xkg today"; סשן נקי אחד ⇒ צ'יפ 🎯 "עוד סשן אחד פותח את המדרגה הבאה".

## תשתית
- `SCHEMA_VERSION = 8` — מיגרציה אוטומטית מוסיפה `checkins` ו-`mission`; ייצוא/ייבוא גיבוי כולל אותם.

---


## 🚀 איך מיישמים (3 צעדים אצלך במחשב)

```bash
cd apex-os-app
npm install            # תלות חדשה: @capacitor/app (כפתור Back)
npm test               # ודא שהכול ירוק (לא ניתן להריץ בסביבת הסקירה)
npx cap sync android   # סנכרון הפלאגין החדש לפרויקט האנדרואיד
```

ואז commit + push כרגיל:
```bash
git add -A && git commit -m "v2.1: data-integrity fixes, native UX, VAS tracking, weekly report" && git push
```

---

# 🔧 V2.1 — תיקוני יסוד

## 🔴 באגים קריטיים שתוקנו

### 1. תמונת פרופיל כבר לא יכולה להרוס את כל השמירה
- **חדש:** `src/utils/image.js` — דחיסת התמונה ל-thumbnail JPEG ‏(~256px) לפני שמירה.
- לפני: תמונה מהמצלמה (2–10MB) כ-base64 חרגה ממכסת localStorage ⇒ **כל** השמירות נכשלו בשקט.
- בנוסף: `saveAppState` מחזיר עכשיו הצלחה/כישלון, ו-App מציג באנר אדום "SAVE FAILED" אם השמירה נכשלת — אין יותר אובדן שקט.

### 2. באג תאריך UTC
- `App.jsx` + `stats.js (createBenchmarkEntry)`: תאריך אימון נגזר עכשיו מ-`getLocalDateKey` (זמן מקומי) ולא מ-`toISOString().slice(0,10)` ‏(UTC).
- לפני: אימון שהסתיים אחרי חצות (00:00–03:00 שעון ישראל) נרשם על אתמול ושיבש heatmap וסטרייקים.

### 3. מנגנון מיגרציות אמיתי במקום ה-hack של V6
- `src/utils/storage.js`: ‏`SCHEMA_VERSION = 7` + ‏`runMigrations` — כל עדכון סכמה עתידי הוא עוד entry, בלי לדרוס התאמות אישיות.
- הדגל הישן `apex-v6-migrated` מזוהה ומומר אוטומטית; ה-hack מ-App.jsx נמחק.
- מיגרציית v7: כל סשן בהיסטוריה מקבל שדה `vas` (ראה פיצ'רים).

---

## 📱 חוויית אנדרואיד נייטיב

### 4. כפתור Back חומרתי מטופל (App.jsx)
סדר עדיפויות: פרופיל פתוח → סגור · מסך סיום → סגור · **Focus Mode → דיאלוג אישור** · טאב אחר → חזרה ל-Home · ‏Home → מזעור האפליקציה.
דורש `npm install` (נוספה תלות `@capacitor/app`); בדפדפן/בלי הפלאגין — נופל בחן לאחור.

### 5. RestTimer משוכתב (RestTimer.jsx)
- **מבוסס timestamp** (`endTime`) במקום ספירת setInterval — שורד מסך כבוי/רקע, ומסתנכרן מחדש ב-visibilitychange.
- **רטט**: ספירה לאחור 3-2-1 (impact בינוני) + סיום (impact חזק) דרך Haptics; ‏fallback ל-navigator.vibrate בדפדפן.
- **כפתורי ‎±15s** להארכה/קיצור מנוחה תוך כדי.

### 6. מסך דולק באימון (FocusMode.jsx)
Wake Lock API (נתמך ב-WebView של אנדרואיד) נרכש בכניסה ל-Focus ומשוחרר ביציאה — **בלי פלאגין חדש**. נרכש מחדש אוטומטית בחזרה מרקע.

### 7. הגנה מסיום בטעות (FocusMode.jsx)
לחיצה על Finish/Exit כשנותרו סטים ⇒ דיאלוג אישור שמציג כמה סטים יירשמו.

---

## ✨ פיצ'רים חדשים

### 8. מעקב VAS ברך + גב תחתון (WorkoutCompleteOverlay.jsx)
בסיום כל אימון: שני סליידרים 0–10 עם צבעי רמזור (🟢 0–2 · 🟡 3–4 · 🔴 5+). הערכים נשמרים על הסשן בהיסטוריה (`session.vas = { knee, back }`) — הרמזור מהתוכנית הופך מדיסציפלינה לדאטה.

### 9. דוח שבועי אוטומטי (utils/report.js + ProfileScreen)
Profile → Data & Reports → **Weekly Report**: מחולל טקסט של 7 הימים האחרונים — אימונים שבוצעו, סטים, זמן עבודה, שיאים חדשים, וממוצעי VAS עם רמזור. נפתח ב-share sheet (או מועתק ללוח) — לולאת המשוב למאמן בלחיצה אחת.

### 10. גיבוי: Export / Import (ProfileScreen)
- **Export Data** — הורדת JSON מלא של כל ה-state (עם גרסת סכמה ותאריך).
- **Import Data** — שחזור מקובץ גיבוי, עם ולידציה, אישור דריסה, והרצת מיגרציות על הקובץ המיובא.

### 11. ErrorBoundary (components/ErrorBoundary.jsx)
קריסת render ⇒ במקום מסך שחור: מסך שגיאה עם "TRY AGAIN" ו-"EXPORT MY DATA" (ייצוא ה-state הגולמי מ-localStorage גם כשהאפליקציה שבורה).

---

## ⚙️ ביצועים ואיכות

### 12. VisualShowcase מחוץ ל-bundle הראשי
‏680 שורות + 28KB CSS של מסכי דמו נטענים עכשיו ב-`React.lazy` רק כשנכנסים עם `?visual=`. הרשימה `VISUAL_SHOWCASE_SLUGS` עברה ל-`components/visualShowcaseSlugs.js` (עם re-export לתאימות).

### 13. שמירה עם debounce (App.jsx)
‏400ms debounce — סריאליזציה של כל ההיסטוריה לא רצה יותר על כל הקלדה.

---

## קבצים שהשתנו
| קובץ | סוג |
|---|---|
| `src/utils/storage.js` | שוכתב — מיגרציות, export/import, שמירה בטוחה |
| `src/utils/image.js` | **חדש** — דחיסת תמונה |
| `src/utils/report.js` | **חדש** — דוח שבועי |
| `src/utils/stats.js` | תוקן — תאריך מקומי |
| `src/App.jsx` | שוכתב — כל סעיפי 2,4,8,12,13 |
| `src/components/RestTimer.jsx` | שוכתב |
| `src/components/WorkoutCompleteOverlay.jsx` | שוכתב — VAS |
| `src/components/FocusMode.jsx` | wake lock + אישור יציאה |
| `src/components/ProfileScreen.jsx` | שוכתב — Data & Reports |
| `src/components/ErrorBoundary.jsx` | **חדש** |
| `src/components/visualShowcaseSlugs.js` | **חדש** |
| `src/components/VisualShowcase.jsx` | import מהמודול החדש |
| `package.json` | ‏+`@capacitor/app` |

## מה נשאר פתוח (מהסקירה, לא נכלל בסבב הזה)
ESLint/Prettier + CI ב-GitHub Actions · README אמיתי · ניקוי webm/test-results מהריפו · רמזי דאבל-פרוגרסיה · גרף משקל גוף · מעבר ל-IndexedDB · עברית/RTL.
