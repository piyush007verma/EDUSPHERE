// =====================================================================
// src/data/siteContent.js
// ---------------------------------------------------------------------
// The text content of the Home page sections (FAQ, "Why EduSphere",
// student reviews, statistics).
//
// Keeping text OUT of the components keeps the components short:
// a component just says "loop over this array and draw a card for
// every item" using .map().
// =====================================================================

// "Why Learn With EduSphere?" cards
export const whyChoose = [
  { title: "Expert Instructors", text: "Learn from industry professionals." },
  { title: "Learn at Your Pace", text: "Study anytime, anywhere." },
  { title: "Practical Projects", text: "Build a real-world portfolio." },
  { title: "Certificates", text: "Validate your skills." },
];

// Student reviews shown on the Home page
export const homeReviews = [
  {
    image: "/images/students/student-1.jpg",
    name: "Alex W.",
    stars: "★★★★★",
    text: "EduSphere changed my career trajectory completely. The hands-on projects are incredible. Highly recommended!",
  },
  {
    image: "/images/students/student-2.jpg",
    name: "Sarah J.",
    stars: "★★★★★",
    text: "I landed a data analyst role right after finishing my certificate. The instructors are genuinely experts.",
  },
  {
    image: "/images/students/student-3.jpg",
    name: "David M.",
    stars: "★★★★☆",
    text: "Flexible schedule and high quality content. The Python course was challenging but highly rewarding.",
  },
];

// Questions and answers for the FAQ accordion
export const faqs = [
  {
    question: "Do I need prior experience to join?",
    answer:
      "Most of our courses, including Python and Web Development, are designed for absolute beginners. We start from the basics and build up your skills step-by-step.",
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Yes! Our certificates prove that you have completed rigorous, project-based curriculums. Many of our students have used their EduSphere portfolios to land jobs in tech.",
  },
  {
    question: "How long do I have access to a course?",
    answer:
      "Once you enroll in a course, you have lifetime access to the materials, including any future updates to the curriculum.",
  },
  {
    question: "Can I learn on my mobile phone?",
    answer:
      "Absolutely. Our platform is 100% responsive, meaning you can watch lectures and read materials directly from your smartphone or tablet.",
  },
];

// Numbers in the statistics strip.
// `value` is a real NUMBER (so it can count up), `suffix` is the text after it.
export const stats = [
  { value: 500, suffix: "+", label: "Courses" },
  { value: 20, suffix: "K+", label: "Learners" },
  { value: 150, suffix: "+", label: "Mentors" },
  { value: 95, suffix: "%", label: "Success Rate" },
];
