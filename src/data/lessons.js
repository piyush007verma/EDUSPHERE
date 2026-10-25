// =====================================================================
// data/lessons.js  -  the LEARNING content of every course
//
//   course  ->  topics (modules)  ->  lessons (one YouTube video each)
//
// The topic titles are the same as the "Course curriculum" on each course
// page. `video` is the YouTube video ID: the part after  watch?v=  in the
// video's address, e.g.  youtube.com/watch?v=rfscVS0vtbw  ->  "rfscVS0vtbw"
//
// TO CHANGE A VIDEO: replace the `video` text with another video's ID.
// TO ADD A LESSON:   add one more { title, video, about } line to a topic.
//
// IMPORTANT: run  npm run check-videos  (needs internet). It opens every
// video ID on YouTube and tells you which ones still work and what they are
// called, so you can fix any dead one before your demo.
// =====================================================================

export const curriculum = {
  // ------------------------------------------------------------ PYTHON
  python: [
    { title: "Python Fundamentals", lessons: [
      { title: "Install Python and set up your editor", video: "YYXdXT2l-Gg", about: "Install Python on your computer and write your very first program." },
      { title: "Python full course for beginners", video: "rfscVS0vtbw", about: "A complete beginner tour of Python: syntax, variables, loops and more." },
    ] },
    { title: "Variables & Data Types", lessons: [
      { title: "Strings: working with text", video: "k9TUPpGqYTo", about: "Create, slice and format text using Python strings." },
      { title: "Integers and floats: working with numbers", video: "khKv-8q7YmY", about: "Do maths in Python with whole numbers and decimals." },
      { title: "Lists, tuples and sets", video: "W8KRzm-HUcc", about: "Store collections of values and choose the right type for the job." },
      { title: "Dictionaries: key-value pairs", video: "daefaLgNkw0", about: "Look up values by name using dictionaries." },
    ] },
    { title: "Conditional Statements", lessons: [
      { title: "If, elif and else statements", video: "DZwmZ8Usvnk", about: "Make your program take decisions with conditions and booleans." },
    ] },
    { title: "Loops", lessons: [
      { title: "For and while loops", video: "6iF8Xb7Z3wQ", about: "Repeat actions with for loops, while loops, break and continue." },
    ] },
    { title: "Functions", lessons: [
      { title: "Functions in Python", video: "9Os0o3wzS_I", about: "Package code into reusable functions with arguments and return values." },
    ] },
    { title: "Object-Oriented Programming", lessons: [
      { title: "Classes and instances", video: "ZDa-Z5JzLYM", about: "Build your own types with classes, attributes and methods." },
      { title: "Class variables", video: "BJ-VvGyQxho", about: "Share data between all objects of a class." },
      { title: "Classmethods and staticmethods", video: "rq8cL2XMM5M", about: "Understand the three kinds of methods in a class." },
    ] },
    { title: "File Handling", lessons: [
      { title: "Reading and writing files", video: "Uh2ebFW8OYM", about: "Open, read, write and safely close files with the with statement." },
    ] },
    { title: "Final Project", lessons: [
      { title: "Python full course: build along", video: "_uQrJ0TkZlc", about: "Follow a complete Python course and practise everything you learned." },
    ] },
  ],

  // --------------------------------------------------------- FULL STACK
  fullstack: [
    { title: "HTML5 & Web Structure", lessons: [
      { title: "HTML full course for beginners", video: "pQN-pnXPaVg", about: "Learn headings, links, images, forms and semantic page structure." },
    ] },
    { title: "CSS3 Styling & Layouts", lessons: [
      { title: "CSS full course", video: "OXGznpKZ_sA", about: "Style pages with selectors, the box model, colours and layouts." },
      { title: "CSS crash course", video: "yfoY53QXEnI", about: "A fast tour of the most important CSS features." },
    ] },
    { title: "Responsive Design (Flexbox & Grid)", lessons: [
      { title: "Learn CSS Grid", video: "9zBsdzdE4sM", about: "Build two-dimensional layouts that adapt to every screen." },
    ] },
    { title: "Frontend Interactivity", lessons: [
      { title: "JavaScript full course for beginners", video: "PkZNo7MFNFg", about: "Learn JavaScript from variables to the DOM." },
      { title: "React course for beginners", video: "bMknfKXIFA8", about: "Build interactive interfaces with components, props and state." },
    ] },
    { title: "Backend Fundamentals", lessons: [
      { title: "Node.js and Express.js full course", video: "Oe421EPjeBE", about: "Create a web server and routes with Node.js and Express." },
    ] },
    { title: "Databases & Storage", lessons: [
      { title: "SQL database full course for beginners", video: "HXV3zeQKqGY", about: "Design tables and write queries to store and read data." },
    ] },
    { title: "API Integration", lessons: [
      { title: "APIs for beginners", video: "GZvSYJDk-us", about: "Learn how APIs work and how to call them from your app." },
    ] },
    { title: "Final Full Stack Project", lessons: [
      { title: "React crash course: build a project", video: "w7ejDZ8SWv8", about: "Build a small React project from start to finish." },
      { title: "Git and GitHub for beginners", video: "RGOj5yH7evk", about: "Save your project history and publish your code on GitHub." },
    ] },
  ],

  // ------------------------------------------------------------------ AI
  ai: [
    { title: "Intro to Artificial Intelligence", lessons: [
      { title: "What is artificial intelligence?", video: "a0_lo_GDcFw", about: "A friendly introduction to what AI is and what it can do." },
      { title: "Intro to large language models", video: "zjkBMFhNj_g", about: "How the models behind modern chatbots work, explained simply." },
    ] },
    { title: "Data Preprocessing", lessons: [
      { title: "Pandas tutorial: getting started", video: "ZyhVh-qRZPA", about: "Load and explore data, the first step of preparing it for AI." },
      { title: "Pandas tutorial: DataFrames and Series", video: "zmdjNSmRXF4", about: "Understand the two core data structures of Pandas." },
    ] },
    { title: "Machine Learning Basics", lessons: [
      { title: "A gentle introduction to machine learning", video: "Gv9_4yMHFhI", about: "What machine learning is and the main ideas behind it." },
      { title: "Bias and variance", video: "EuBBz3bI-aA", about: "Why models can be too simple or too complex." },
    ] },
    { title: "Training Models", lessons: [
      { title: "Gradient descent, step by step", video: "sDv4f4s2SB8", about: "How a model learns by slowly reducing its error." },
      { title: "Linear regression", video: "nk2CQITm_eo", about: "Fit a line to data: the simplest trainable model." },
    ] },
    { title: "Evaluating Model Performance", lessons: [
      { title: "The confusion matrix", video: "Kdsp6soqA7o", about: "Count the right and wrong predictions of a classifier." },
      { title: "ROC and AUC", video: "4jRBRDbJemM", about: "Compare classifiers using the ROC curve." },
      { title: "Cross validation", video: "fSytzGwwBVw", about: "Test a model fairly using different parts of your data." },
    ] },
    { title: "Neural Networks Introduction", lessons: [
      { title: "But what is a neural network?", video: "aircAruvnKk", about: "A visual introduction to neurons, layers and weights." },
      { title: "How neural networks learn", video: "IHZwWFHWa-w", about: "Gradient descent applied to a neural network." },
      { title: "Backpropagation, intuitively", video: "Ilg3gGewQ5U", about: "How the error flows backwards to improve each weight." },
    ] },
    { title: "AI Ethics & Bias", lessons: [
      { title: "How I'm fighting bias in algorithms", video: "UG_X_7g63rY", about: "A talk on how biased data creates unfair AI systems." },
    ] },
    { title: "Final AI Application Project", lessons: [
      { title: "Let's build GPT from scratch", video: "kCc8FmEb1nY", about: "Build a small language model step by step." },
      { title: "Machine learning for everybody", video: "i_LwzRVP7bg", about: "A full course with hands-on machine learning projects." },
    ] },
  ],

  // ------------------------------------------------------- DATA SCIENCE
  datascience: [
    { title: "Introduction to Data Science", lessons: [
      { title: "What are statistics?", video: "zouPoc49xbk", about: "Why data and statistics matter for every decision." },
    ] },
    { title: "Python for Data Analysis", lessons: [
      { title: "NumPy tutorial for beginners", video: "QUT1VHiLmmI", about: "Work with fast arrays of numbers using NumPy." },
      { title: "Pandas tutorial: getting started", video: "ZyhVh-qRZPA", about: "Load and explore data with Pandas." },
    ] },
    { title: "Data Cleaning & Preparation", lessons: [
      { title: "Pandas: updating rows and columns", video: "DCDe29sIKcE", about: "Fix and change values in a dataset." },
      { title: "Pandas: cleaning data and missing values", video: "KdmPHEnPJPs", about: "Handle missing values and wrong data types." },
    ] },
    { title: "Exploratory Data Analysis", lessons: [
      { title: "Pandas: filtering rows and columns", video: "Lw2rlcxScZY", about: "Pick exactly the data you want to look at." },
      { title: "Pandas: grouping and aggregating", video: "txMdrV1Ut64", about: "Summarise data by groups to find patterns." },
    ] },
    { title: "Data Visualization", lessons: [
      { title: "Matplotlib: creating your first plots", video: "UO98lJQ3QGI", about: "Turn numbers into line charts and bar charts." },
    ] },
    { title: "Statistical Foundations", lessons: [
      { title: "Mean, variance and standard deviation", video: "SzZ6GpcfoQY", about: "Measure the centre and the spread of your data." },
      { title: "The normal distribution", video: "rzFX5NWojp0", about: "The bell curve and why it appears everywhere." },
      { title: "P-values", video: "vemZtEM63GY", about: "Decide if a result is real or just luck." },
    ] },
    { title: "Intro to Machine Learning", lessons: [
      { title: "A gentle introduction to machine learning", video: "Gv9_4yMHFhI", about: "What machine learning is and how it uses data." },
    ] },
    { title: "Final Data Analysis Project", lessons: [
      { title: "Data analysis with Python: full course", video: "r-uOLxNrNk8", about: "Put NumPy, Pandas and Matplotlib together on real data." },
    ] },
  ],

  // ----------------------------------------------------- CYBER SECURITY
  cybersecurity: [
    { title: "Intro to Cyber Security", lessons: [
      { title: "Cybersecurity: crash course", video: "bPVaOlJ6ln0", about: "The big picture of attacks and defences in the digital world." },
    ] },
    { title: "Threats, Attacks, and Vulnerabilities", lessons: [
      { title: "SQL injection", video: "ciNHn38EyRc", about: "How attackers abuse a database query and how to stop them." },
      { title: "Cross-site scripting (XSS)", video: "L5l9lSnNMxg", about: "How malicious scripts end up running in other users' browsers." },
    ] },
    { title: "Network Security Fundamentals", lessons: [
      { title: "How the internet works", video: "AEaKrq3SpW8", about: "Packets, addresses and the layers networks are built on." },
      { title: "Computer networking full course", video: "qiQR5rTSshw", about: "A longer course on networking for security beginners." },
    ] },
    { title: "Cryptography Basics", lessons: [
      { title: "Public key cryptography", video: "GSIDS_lvRv4", about: "How two strangers can share secrets safely." },
      { title: "AES encryption explained", video: "O4xNJsjtN6E", about: "The standard algorithm that protects most of our data." },
      { title: "Hashing algorithms and security", video: "b4b8ktEV4Bg", about: "One-way functions and what they are used for." },
    ] },
    { title: "Authentication & Access Control", lessons: [
      { title: "How NOT to store passwords", video: "8ZtInClXe1Q", about: "Why passwords must be hashed and salted." },
      { title: "Password cracking", video: "7U-RbOKanYs", about: "How attackers guess passwords and how to resist them." },
    ] },
    { title: "Security Best Practices", lessons: [
      { title: "Hashing and password security", video: "b4b8ktEV4Bg", about: "Review the habits that keep accounts and data safe." },
    ] },
    { title: "Intro to Ethical Hacking", lessons: [
      { title: "Ethical hacking in 15 hours", video: "3Kq1MIfTWCE", about: "A long hands-on course on penetration testing." },
    ] },
    { title: "Final Security Audit Project", lessons: [
      { title: "Nmap tutorial: network scanning", video: "4t4kBkMsDbQ", about: "Scan a network to see which devices and services are exposed." },
    ] },
  ],

  // --------------------------------------------------------------- CLOUD
  cloud: [
    { title: "Intro to Cloud Computing", lessons: [
      { title: "Cloud computing explained", video: "M988_fsOSWo", about: "What the cloud is and why companies use it." },
    ] },
    { title: "Virtualization Basics", lessons: [
      { title: "Virtualization explained", video: "FZR0rG3HKIk", about: "How one physical machine can run many virtual ones." },
      { title: "Docker tutorial for beginners", video: "3c-iBn73dDE", about: "Containers: a lighter way to package and run software." },
    ] },
    { title: "Cloud Deployment Models", lessons: [
      { title: "AWS Cloud Practitioner full course", video: "SOTamWNgDKc", about: "Public, private and hybrid cloud, with core AWS services." },
    ] },
    { title: "Cloud Compute Services", lessons: [
      { title: "Kubernetes tutorial for beginners", video: "X48VuDVv0do", about: "Run and scale many containers automatically." },
    ] },
    { title: "Cloud Storage & Databases", lessons: [
      { title: "AWS basics for beginners", video: "3hLmDS179YE", about: "Storage, databases and the basic AWS services." },
    ] },
    { title: "Cloud Networking", lessons: [
      { title: "AWS VPC: beginner to pro", video: "g2JOHLHh4rI", about: "Build a private network inside the cloud." },
    ] },
    { title: "Security & Shared Responsibility", lessons: [
      { title: "AWS Cloud Practitioner: security and responsibility", video: "SOTamWNgDKc", about: "Who secures what: you or the cloud provider." },
    ] },
    { title: "Final Deployment Project", lessons: [
      { title: "Terraform: automate your cloud infrastructure", video: "SLB_c_ayRMo", about: "Describe your infrastructure in code and deploy it." },
    ] },
  ],
};

// ---------------------------------------------------------------------
// Helper used by the learning page.
// Gives every lesson an `id` like "2-3" (topic 2, lesson 3) and remembers
// which topic it belongs to. These ids are used in the page address:
//   /learn/python/2-3
// ---------------------------------------------------------------------
export function getModules(slug) {
  const modules = curriculum[slug] || [];
  return modules.map((module, moduleIndex) => ({
    title: module.title,
    lessons: module.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      id: `${moduleIndex + 1}-${lessonIndex + 1}`,
      moduleIndex,
      moduleTitle: module.title,
    })),
  }));
}

// All lessons of a course in one flat list (used for Previous / Next and progress)
export function getAllLessons(slug) {
  return getModules(slug).flatMap((module) => module.lessons);
}
