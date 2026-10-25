// =====================================================================
// pages/Home.jsx  -  the Home page.
// It only ASSEMBLES smaller components, like building with Lego blocks.
// =====================================================================
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import CoursesSection from "../components/CoursesSection.jsx";
import WhyChoose from "../components/WhyChoose.jsx";
import Reviews from "../components/Reviews.jsx";
import FAQ from "../components/FAQ.jsx";

import { courses } from "../data/courses.js";

export default function Home() {
  // Pick the 3 popular courses (in this order) out of the full list
  const popularCourses = ["fullstack", "python", "ai"].map((slug) =>
    courses.find((course) => course.slug === slug)
  );

  return (
    <>
      <Hero />
      <Stats />

      <CoursesSection courses={popularCourses} />

      <WhyChoose />
      <Reviews />
      <FAQ />
    </>
  );
}
