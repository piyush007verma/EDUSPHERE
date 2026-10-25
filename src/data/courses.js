// =====================================================================
// src/data/courses.js
// ---------------------------------------------------------------------
// ALL course information lives here, in ONE place.
//
// Why? In the old HTML site we had 6 nearly-identical course pages
// (python.html, ai.html, cloud.html ...). In React we write the page
// layout ONCE (pages/CourseDetail.jsx) and feed it data from this array.
// Adding a 7th course = adding one more object below. No new page needed.
//
// Each object is one course. `slug` is the unique id used in the URL:
//   /courses/python   ->   the object whose slug is "python"
// =====================================================================

export const courses = [
  {
    slug: "python",
    title: "Python Programming",
    description: "Master Python fundamentals and build a strong foundation.",
    image: "/images/courses/python-programming.jpg",
    tag: "Popular",
    category: "Programming",
    subtitle: "Master Python fundamentals and develop a strong foundation in programming, problem solving and real-world development.",
    heroImage: "/images/courses/python-programming.jpg",
    rating: "4.8 ★★★★★",
    students: "12,500+ learners",
    instructorName: "Expert EduSphere Instructor",
    price: "₹1,999",
    info: {
      Duration: "12 Weeks",
      Level: "Beginner",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      { title: "Beginner Friendly", text: "Start from scratch, no prior coding experience required." },
      { title: "Hands-on Projects", text: "Build real-world applications to solidify your skills." },
      { title: "Expert Guidance", text: "Learn from industry professionals with years of experience." },
      {
        title: "Industry Relevant Skills",
        text: "Curriculum designed to meet current job market demands."
      },
      { title: "Practical Exercises", text: "Daily coding challenges to test your knowledge." },
      { title: "Certificate of Completion", text: "Earn a recognized certificate to boost your resume." }
    ],
    learn: [
      "Python fundamentals",
      "Variables and data types",
      "Conditional statements",
      "Loops",
      "Functions",
      "Object-oriented programming",
      "File handling",
      "Problem solving",
      "Real-world projects"
    ],
    modules: [
      { title: "Python Fundamentals", meta: "8 Lessons • 1h 30m" },
      { title: "Variables & Data Types", meta: "7 Lessons • 1h 15m" },
      { title: "Conditional Statements", meta: "6 Lessons • 1h" },
      { title: "Loops", meta: "8 Lessons • 1h 20m" },
      { title: "Functions", meta: "8 Lessons • 1h 30m" },
      { title: "Object-Oriented Programming", meta: "10 Lessons • 2h" },
      { title: "File Handling", meta: "6 Lessons • 1h" },
      { title: "Final Project", meta: "1 Project • 3h" }
    ],
    about: "This comprehensive course is designed to take you from a complete beginner to a confident Python programmer. You will develop logical thinking, learn how to structure code efficiently, and build functional applications.",
    requirements: [
      "No prior programming experience required",
      "Basic computer knowledge",
      "Willingness to practice",
      "Laptop or PC recommended"
    ],
    whoFor: ["Beginners", "College Students", "Aspiring Developers", "Career Switchers"],
    instructor: {
      image: "/images/students/student-1.jpg",
      name: "Dr. Alex Carter",
      role: "Senior Software Engineer & Educator",
      bio: "10+ years of experience in Python development. Passionate about making complex programming concepts accessible to beginners.",
      rating: "4.9 ★",
      learners: "50,000+"
    },
    reviews: [
      {
        image: "/images/students/student-1.jpg",
        name: "Sarah J.",
        stars: "★★★★★",
        text: "Amazing course! The concepts were explained very clearly. I built my first app!"
      },
      {
        image: "/images/students/student-2.jpg",
        name: "Rahul M.",
        stars: "★★★★★",
        text: "Perfect for college students. The final project helped me land my first internship."
      },
      {
        image: "/images/students/student-3.jpg",
        name: "Emily T.",
        stars: "★★★★☆",
        text: "Great structure and pace. Highly recommend for absolute beginners."
      }
    ]
  },
  {
    slug: "fullstack",
    title: "Full Stack Web Development",
    description: "Learn to design and build complete websites from scratch.",
    image: "/images/courses/web-development.jpg",
    tag: "Bestseller",
    category: "Development",
    subtitle: "Master front-end and back-end technologies to build complete, responsive, and dynamic websites from scratch.",
    heroImage: "/images/courses/fullstack.jpeg",
    rating: "4.7 ★★★★★",
    students: "15,200+ learners",
    instructorName: "Sarah Jenkins",
    price: "₹2,999",
    info: {
      Duration: "16 Weeks",
      Level: "Intermediate",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      {
        title: "Comprehensive Curriculum",
        text: "Covering both client-side and server-side programming."
      },
      {
        title: "Hands-on Projects",
        text: "Build real-world websites to create a professional portfolio."
      },
      { title: "Expert Guidance", text: "Learn best practices from senior web developers." },
      {
        title: "Industry Relevant Skills",
        text: "Learn the exact technologies tech companies are hiring for."
      },
      { title: "Practical Exercises", text: "Code-along sessions to strengthen muscle memory." },
      {
        title: "Certificate of Completion",
        text: "Validate your full-stack skills with an EduSphere certificate."
      }
    ],
    learn: [
      "HTML5 & CSS3",
      "Frontend development",
      "Responsive websites",
      "Backend concepts",
      "Databases",
      "Web Servers",
      "API Integration",
      "Version Control (Git)",
      "Projects deployment"
    ],
    modules: [
      { title: "HTML5 & Web Structure", meta: "8 Lessons • 2h" },
      { title: "CSS3 Styling & Layouts", meta: "10 Lessons • 2h 30m" },
      { title: "Responsive Design (Flexbox & Grid)", meta: "6 Lessons • 1h 45m" },
      { title: "Frontend Interactivity", meta: "12 Lessons • 3h" },
      { title: "Backend Fundamentals", meta: "8 Lessons • 2h" },
      { title: "Databases & Storage", meta: "7 Lessons • 2h" },
      { title: "API Integration", meta: "6 Lessons • 1h 30m" },
      { title: "Final Full Stack Project", meta: "1 Project • 4h" }
    ],
    about: "This boot-camp style course covers everything you need to build websites from the ground up. You will learn how to design beautiful user interfaces, connect them to robust databases, and deploy your creations to the live internet. Perfect for aspiring web engineers.",
    requirements: [
      "No prior coding experience required",
      "Basic computer knowledge",
      "Willingness to practice coding daily",
      "Laptop or PC recommended"
    ],
    whoFor: ["Beginners", "College Students", "Aspiring Web Developers", "Career Switchers"],
    instructor: {
      image: "/images/teachers/fullstack.jpg",
      name: "Code With Harry",
      role: "Lead Web Developer",
      bio: "Sarah has built enterprise-level applications for top tech firms and loves breaking down complex web architecture into simple, digestible pieces.",
      rating: "4.8 ★",
      learners: "35,000+"
    },
    reviews: [
      {
        image: "/images/teachers/fullstack.jpg",
        name: "Michael R.",
        stars: "★★★★★",
        text: "Finally understand how the front-end talks to the back-end. Fantastic course!"
      },
      {
        image: "/images/students/student-3.jpg",
        name: "Anita D.",
        stars: "★★★★★",
        text: "The projects are super fun to build. I feel ready to apply for junior roles."
      },
      {
        image: "/images/students/student-2.jpg",
        name: "Chris P.",
        stars: "★★★★☆",
        text: "Great depth, especially the modules on CSS layout and database design."
      }
    ]
  },
  {
    slug: "ai",
    title: "Artificial Intelligence",
    description: "Explore the fundamentals of AI and intelligent systems.",
    image: "/images/courses/artificial-intelligence.jpg",
    tag: "New",
    category: "Technology",
    subtitle: "Dive into the world of AI, exploring machine learning models, neural networks, and real-world AI applications.",
    heroImage: "/images/courses/Ai.jpg",
    rating: "4.9 ★★★★★",
    students: "10,800+ learners",
    instructorName: "Dr. Alan Turing",
    price: "₹2,499",
    info: {
      Duration: "14 Weeks",
      Level: "Intermediate",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      { title: "Future-Proof Skills", text: "Learn the technologies shaping the next decade." },
      { title: "Hands-on Projects", text: "Train your own models to recognize patterns and data." },
      { title: "Expert Guidance", text: "Taught by experienced AI researchers and engineers." },
      { title: "Industry Relevant Skills", text: "Focus on applied AI rather than just pure theory." },
      { title: "Practical Exercises", text: "Work with standard industry datasets." },
      {
        title: "Certificate of Completion",
        text: "Showcase your understanding of artificial intelligence."
      }
    ],
    learn: [
      "AI fundamentals",
      "Machine learning concepts",
      "Data preprocessing",
      "Supervised & Unsupervised Learning",
      "Neural Networks Basics",
      "AI Models",
      "AI applications",
      "AI Ethics",
      "Practical projects"
    ],
    modules: [
      { title: "Intro to Artificial Intelligence", meta: "6 Lessons • 1h 30m" },
      { title: "Data Preprocessing", meta: "8 Lessons • 2h" },
      { title: "Machine Learning Basics", meta: "10 Lessons • 2h 30m" },
      { title: "Training Models", meta: "8 Lessons • 2h" },
      { title: "Evaluating Model Performance", meta: "7 Lessons • 1h 45m" },
      { title: "Neural Networks Introduction", meta: "8 Lessons • 2h" },
      { title: "AI Ethics & Bias", meta: "5 Lessons • 1h" },
      { title: "Final AI Application Project", meta: "1 Project • 3h" }
    ],
    about: "Artificial Intelligence is transforming every industry. This course breaks down the complex math and algorithms into practical, understandable steps. You will learn how machines learn from data, make predictions, and how you can harness this technology for your own projects.",
    requirements: [
      "Basic understanding of programming (Python recommended)",
      "High school level mathematics",
      "Willingness to practice",
      "Laptop or PC recommended"
    ],
    whoFor: ["Tech Enthusiasts", "College Students", "Software Developers", "Data Analysts"],
    instructor: {
      image: "/images/teachers/alan-turing.jpeg",
      name: "Dr. Alan Turing",
      role: "AI Researcher & Data Scientist",
      bio: "With a PhD in Machine Learning, Alan brings academic rigor and industry practice together to make AI accessible to everyone.",
      rating: "4.9 ★",
      learners: "22,000+"
    },
    reviews: [
      {
        image: "/images/students/student-2.jpg",
        name: "Jason K.",
        stars: "★★★★★",
        text: "Demystified AI for me completely. The projects were very engaging."
      },
      {
        image: "/images/students/student-1.jpg",
        name: "Sophia L.",
        stars: "★★★★★",
        text: "Excellent explanations of machine learning concepts without getting bogged down in math."
      },
      {
        image: "/images/students/student-3.jpg",
        name: "David M.",
        stars: "★★★★☆",
        text: "Challenging but highly rewarding. Great introduction to neural networks."
      }
    ]
  },
  {
    slug: "datascience",
    title: "Data Science",
    description: "Learn to analyze data and turn numbers into insights.",
    image: "/images/courses/data-science.jpg",
    category: "Data",
    subtitle: "Learn how to extract meaning from data using statistical analysis, Python, and powerful data visualization tools.",
    heroImage: "/images/courses/DataScience.jpg",
    rating: "4.8 ★★★★★",
    students: "14,000+ learners",
    instructorName: "Elena Rodriguez",
    price: "₹2,499",
    info: {
      Duration: "14 Weeks",
      Level: "Intermediate",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      { title: "High Demand Skill", text: "Data Science is one of the fastest-growing fields globally." },
      { title: "Hands-on Projects", text: "Analyze real-world datasets and draw actionable insights." },
      { title: "Expert Guidance", text: "Learn from practicing data scientists." },
      {
        title: "Industry Relevant Skills",
        text: "Master the tools companies use for business intelligence."
      },
      { title: "Practical Exercises", text: "Clean, sort, and visualize data step-by-step." },
      { title: "Certificate of Completion", text: "Prove your data analysis capabilities to employers." }
    ],
    learn: [
      "Python for Data Analysis",
      "Data cleaning and processing",
      "Data visualization techniques",
      "Descriptive Statistics",
      "Probability Basics",
      "Machine learning fundamentals",
      "Predictive Modeling",
      "Reporting insights",
      "Projects"
    ],
    modules: [
      { title: "Introduction to Data Science", meta: "5 Lessons • 1h" },
      { title: "Python for Data Analysis", meta: "8 Lessons • 2h" },
      { title: "Data Cleaning & Preparation", meta: "9 Lessons • 2h 15m" },
      { title: "Exploratory Data Analysis", meta: "7 Lessons • 1h 45m" },
      { title: "Data Visualization", meta: "8 Lessons • 2h" },
      { title: "Statistical Foundations", meta: "6 Lessons • 1h 30m" },
      { title: "Intro to Machine Learning", meta: "7 Lessons • 2h" },
      { title: "Final Data Analysis Project", meta: "1 Project • 3h" }
    ],
    about: "Data is the new oil, but it requires processing to be valuable. This course teaches you how to take raw, messy data, clean it up, visualize it, and use it to make informed, data-driven decisions. Ideal for those looking to transition into a Data Analyst or Junior Data Scientist role.",
    requirements: [
      "Basic understanding of programming is helpful",
      "Basic high school statistics",
      "Willingness to practice",
      "Laptop or PC recommended"
    ],
    whoFor: [
      "Aspiring Data Analysts",
      "College Students",
      "Business Professionals",
      "Career Switchers"
    ],
    instructor: {
      image: "/images/teachers/sharda.jpeg",
      name: "Sharda Khapra",
      role: "Senior Data Scientist",
      bio: "Elena has spent years analyzing consumer data for Fortune 500 companies and is dedicated to teaching the analytical mindset required for data science.",
      rating: "4.8 ★",
      learners: "28,000+"
    },
    reviews: [
      {
        image: "/images/students/student-2.jpg",
        name: "Kevin B.",
        stars: "★★★★★",
        text: "The data visualization module was incredibly helpful for my current job."
      },
      {
        image: "/images/students/student-3.jpg",
        name: "Priya S.",
        stars: "★★★★★",
        text: "Elena is a fantastic teacher. She makes complex stats easy to grasp."
      },
      {
        image: "/images/students/student-1.jpg",
        name: "Tom H.",
        stars: "★★★★☆",
        text: "Solid foundation. I feel comfortable working with large datasets now."
      }
    ]
  },
  {
    slug: "cybersecurity",
    title: "Cyber Security",
    description: "Understand how to protect systems and networks.",
    image: "/images/courses/cyber-security.jpg",
    category: "Security",
    subtitle: "Protect networks and data from attacks. Understand core security concepts, threats, and ethical hacking basics.",
    heroImage: "/images/courses/CYSEC.jpeg",
    rating: "4.8 ★★★★★",
    students: "11,500+ learners",
    instructorName: "Marcus Thorne",
    price: "₹2,199",
    info: {
      Duration: "12 Weeks",
      Level: "Beginner",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      { title: "Beginner Friendly", text: "No prior security experience needed to start." },
      { title: "Hands-on Labs", text: "Practice defending systems in secure, simulated environments." },
      { title: "Expert Guidance", text: "Learn from certified ethical hackers." },
      { title: "Industry Relevant Skills", text: "Understand the modern threat landscape." },
      { title: "Practical Exercises", text: "Learn how to spot vulnerabilities and secure networks." },
      {
        title: "Certificate of Completion",
        text: "Take the first step toward IT security certifications."
      }
    ],
    learn: [
      "Cybersecurity fundamentals",
      "Threats and Vulnerabilities",
      "Network security basics",
      "Cryptography",
      "Identity & Access Management",
      "Authentication",
      "Security awareness",
      "Security best practices",
      "Incident Response"
    ],
    modules: [
      { title: "Intro to Cyber Security", meta: "5 Lessons • 1h" },
      { title: "Threats, Attacks, and Vulnerabilities", meta: "8 Lessons • 2h" },
      { title: "Network Security Fundamentals", meta: "7 Lessons • 1h 45m" },
      { title: "Cryptography Basics", meta: "6 Lessons • 1h 30m" },
      { title: "Authentication & Access Control", meta: "7 Lessons • 1h 45m" },
      { title: "Security Best Practices", meta: "6 Lessons • 1h 15m" },
      { title: "Intro to Ethical Hacking", meta: "8 Lessons • 2h" },
      { title: "Final Security Audit Project", meta: "1 Project • 2h 30m" }
    ],
    about: "As technology grows, so does the need to secure it. This beginner-friendly course introduces you to the concepts of confidentiality, integrity, and availability. You'll learn how hackers think, how malware works, and most importantly, how to defend against modern digital threats.",
    requirements: [
      "Basic IT and computer knowledge",
      "Interest in problem-solving and defense",
      "Willingness to practice",
      "Laptop or PC recommended"
    ],
    whoFor: [
      "Beginners in IT",
      "College Students",
      "Aspiring Security Analysts",
      "System Administrators"
    ],
    instructor: {
      image: "/images/teachers/alan-turing.jpeg",
      name: "Marcus Thorne",
      role: "Cyber Security Consultant",
      bio: "Marcus is a Certified Ethical Hacker who helps corporations secure their infrastructure. He brings real-world examples of data breaches into the classroom.",
      rating: "4.7 ★",
      learners: "18,000+"
    },
    reviews: [
      {
        image: "/images/students/student-1.jpg",
        name: "Alex W.",
        stars: "★★★★★",
        text: "Very eye-opening! I never realized how vulnerable typical networks are."
      },
      {
        image: "/images/students/student-2.jpg",
        name: "Samantha P.",
        stars: "★★★★★",
        text: "A great starting point for anyone looking to get into the cybersecurity field."
      },
      {
        image: "/images/students/student-3.jpg",
        name: "John D.",
        stars: "★★★★☆",
        text: "The labs are fantastic. You actually get to see how these attacks work in a safe space."
      }
    ]
  },
  {
    slug: "cloud",
    title: "Cloud Computing",
    description: "Design, deploy and manage scalable infrastructure.",
    image: "/images/courses/cloud-computing.jpg",
    category: "Infrastructure",
    subtitle: "Understand cloud architecture, virtualization, and deployment models using top industry cloud services.",
    heroImage: "/images/courses/cloud-hero.jpg",
    rating: "4.7 ★★★★★",
    students: "9,200+ learners",
    instructorName: "Rachel Adams",
    price: "₹1,999",
    info: {
      Duration: "10 Weeks",
      Level: "Beginner",
      Language: "English",
      Mode: "Self-Paced",
      Certificate: "Available"
    },
    highlights: [
      { title: "Beginner Friendly", text: "Learn cloud concepts from the ground up." },
      { title: "Cloud Agnostic", text: "Core concepts apply to AWS, Azure, and Google Cloud." },
      { title: "Expert Guidance", text: "Taught by certified Cloud Architects." },
      { title: "Industry Relevant Skills", text: "Every modern company is migrating to the cloud." },
      { title: "Practical Exercises", text: "Deploy virtual machines and storage buckets." },
      { title: "Certificate of Completion", text: "Showcase your foundational cloud knowledge." }
    ],
    learn: [
      "Cloud fundamentals (IaaS, PaaS, SaaS)",
      "Virtualization",
      "Cloud services",
      "Cloud Storage",
      "Cloud Networking",
      "Cloud Databases",
      "Deployment Models",
      "Cloud security basics",
      "Pricing and billing"
    ],
    modules: [
      { title: "Intro to Cloud Computing", meta: "5 Lessons • 1h" },
      { title: "Virtualization Basics", meta: "6 Lessons • 1h 15m" },
      { title: "Cloud Deployment Models", meta: "6 Lessons • 1h 30m" },
      { title: "Cloud Compute Services", meta: "8 Lessons • 2h" },
      { title: "Cloud Storage & Databases", meta: "7 Lessons • 1h 45m" },
      { title: "Cloud Networking", meta: "6 Lessons • 1h 30m" },
      { title: "Security & Shared Responsibility", meta: "5 Lessons • 1h" },
      { title: "Final Deployment Project", meta: "1 Project • 2h" }
    ],
    about: "The cloud has revolutionized how software is built and delivered. This course provides a solid foundation in cloud computing principles, teaching you how remote servers, storage, and networking function together to support modern applications.",
    requirements: [
      "Basic understanding of how the internet works",
      "No coding experience required",
      "Willingness to practice",
      "Laptop or PC recommended"
    ],
    whoFor: ["Beginners in IT", "College Students", "Aspiring Cloud Engineers", "Developers"],
    instructor: {
      image: "/images/students/student-2.jpg",
      name: "Rachel Adams",
      role: "Cloud Solutions Architect",
      bio: "Rachel specializes in migrating legacy systems to the cloud. She enjoys helping students understand the \"why\" behind cloud architecture.",
      rating: "4.8 ★",
      learners: "15,000+"
    },
    reviews: [
      {
        image: "/images/students/student-3.jpg",
        name: "Ben C.",
        stars: "★★★★★",
        text: "Perfect introduction. I finally understand the difference between IaaS, PaaS, and SaaS!"
      },
      {
        image: "/images/students/student-1.jpg",
        name: "Lisa F.",
        stars: "★★★★★",
        text: "Very clear and concise. A great stepping stone before tackling AWS or Azure certifications."
      },
      {
        image: "/images/students/student-2.jpg",
        name: "Omar J.",
        stars: "★★★★☆",
        text: "The module on cloud storage and databases was exactly what I needed for my project."
      }
    ]
  }
];
