// =====================================================================
// utils/progress.js  -  saves learning progress and notes in localStorage
//
// Progress is saved PER USER and PER COURSE:
//   key "edusphere_progress" -> { "ann@mail.com|python": { completed: ["1-1","1-2"], last: "1-2" } }
// Notes are saved per user, course and lesson.
// =====================================================================
const PROGRESS_KEY = "edusphere_progress";
const NOTES_KEY = "edusphere_notes";

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

// completed = ids of finished lessons, last = the lesson watched most recently
export function getProgress(email, slug) {
  return load(PROGRESS_KEY)[`${email}|${slug}`] || { completed: [], last: "" };
}

export function saveProgress(email, slug, progress) {
  const all = load(PROGRESS_KEY);
  all[`${email}|${slug}`] = progress;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
}

export function getNote(email, slug, lessonId) {
  return load(NOTES_KEY)[`${email}|${slug}|${lessonId}`] || "";
}

export function saveNote(email, slug, lessonId, text) {
  const all = load(NOTES_KEY);
  all[`${email}|${slug}|${lessonId}`] = text;
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
}
