// =====================================================================
// scripts/check-videos.mjs  -  run with:  npm run check-videos
//
// Opens every YouTube video ID from src/data/lessons.js and prints either
//   OK    <video title>
//   FAIL  <why>   <- replace this ID in lessons.js
// It needs an internet connection (Node 18 or newer).
// =====================================================================
import { curriculum } from "../src/data/lessons.js";
import { courses } from "../src/data/courses.js";

let failed = 0;
const seen = new Map(); // video id -> result (so repeated ids are checked once)

async function check(id) {
  if (seen.has(id)) return seen.get(id);
  const address = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  let result;
  try {
    const response = await fetch(address);
    if (response.ok) {
      const data = await response.json();
      result = { ok: true, text: `${data.title}  (${data.author_name})` };
    } else {
      result = { ok: false, text: `HTTP ${response.status} (video missing, private or embedding disabled)` };
    }
  } catch (error) {
    result = { ok: false, text: `network error: ${error.message}` };
  }
  seen.set(id, result);
  return result;
}

for (const [slug, modules] of Object.entries(curriculum)) {
  console.log(`\n=== ${slug} ===`);

  // Make sure the topic titles match the course page
  const course = courses.find((item) => item.slug === slug);
  modules.forEach((module, index) => {
    if (course.modules[index]?.title !== module.title) {
      console.log(`  WARN  topic ${index + 1} "${module.title}" differs from course page "${course.modules[index]?.title}"`);
    }
  });

  for (const [moduleIndex, module] of modules.entries()) {
    for (const [lessonIndex, lesson] of module.lessons.entries()) {
      const result = await check(lesson.video);
      if (!result.ok) failed++;
      console.log(`  ${result.ok ? "OK  " : "FAIL"}  ${moduleIndex + 1}-${lessonIndex + 1}  ${lesson.video}  ${result.text}`);
    }
  }
}

console.log(failed === 0 ? "\nAll videos work." : `\n${failed} lesson(s) need a new video ID in src/data/lessons.js`);
process.exit(failed === 0 ? 0 : 1);
