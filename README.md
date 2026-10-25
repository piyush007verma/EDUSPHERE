# EduSphere (React)

A modern e-learning platform, converted from static HTML/CSS/JS to a modular React app.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # downloads React, React Router, Vite (first time only)
npm run dev      # starts the site at http://localhost:5173
```

`npm run build` creates the production version in the `dist/` folder.

## Project structure

```
edusphere/
├── index.html              <- one empty <div id="root">, React fills it
├── scripts/check-videos.mjs <- run: npm run check-videos
├── public/                 <- images (served as /images/...)
└── src/
    ├── main.jsx            <- entry point: starts React + the router
    ├── App.jsx             <- root: dark-mode state, menu state, list of pages (routes)
    ├── data/
    │   ├── courses.js      <- ALL course data (6 courses) in one array
    │   └── siteContent.js  <- FAQ, reviews, "why us" cards, statistics
    ├── components/         <- reusable pieces (each has its own .css file)
    │   ├── Navbar, Sidebar, Footer, Newsletter, Logo, ScrollToTop
    │   ├── Hero, SearchBar, CoursesGrid, CourseCard
    │   ├── WhyChoose, Reviews, ReviewCard, FAQ, Stats
    │   └── SectionHeader, PageHero
    ├── pages/              <- one file per page of the website
    │   └── Home, Courses, CourseDetail, Cart, Checkout, Orders, MyCourses, Learn, About, Feedback, NotFound
    └── styles/global.css   <- theme colors, dark mode, reset, buttons, cards
```

## Viva cheat-sheet: what to say

**1. What is a component?**
A function that returns HTML (JSX). `Navbar`, `Footer`, `CourseCard` are each written once
and reused. A page like `Home.jsx` is just components put together.

**2. Props**
Inputs to a component, like function arguments. `<CourseCard course={...} />`,
`<PageHero title="..." />`. Data flows from parent to child.

**3. useState (App.jsx, AuthModal.jsx, Cart.jsx, Checkout.jsx, FAQ.jsx, Courses.jsx ...)**
Memory of a component. When the state changes, React re-draws only what changed.
- `darkMode` (true/false) -> adds class `dark` to the page wrapper -> CSS variables change colors.
- `menuOpen` (true/false) -> adds class `open` to the sidebar -> CSS slides it in.
- `openIndex` in the FAQ -> which answer is open.
- `category` on the Courses page -> which filter button is selected.

**4. localStorage + useEffect (App.jsx)**
- `useState(() => localStorage.getItem("theme") === "dark")` reads the saved choice when the app starts.
- `useEffect(() => localStorage.setItem(...), [darkMode])` saves it every time `darkMode` changes.

**5. Lifting state up**
The Navbar must open the menu and the Sidebar must show it. So `menuOpen` lives in their
parent, `App`, and is passed down as props (`onMenuClick`, `isOpen`, `onClose`).

**6. Lists with .map() and key**
`courses.map(course => <CourseCard key={course.slug} ... />)` replaces copy-pasting HTML.
`key` lets React track each item.

**7. Routing (React Router)**
`<Routes>` in `App.jsx` shows a page depending on the URL. `<Link>` and `<NavLink>` change the
URL without reloading the page. `/courses/:slug` is ONE page template for all 6 courses:
`useParams()` reads the slug, `.find()` gets that course from `courses.js`.

**8. Controlled form (Feedback.jsx)**
Every input has `value={form.x}` and `onChange={handleChange}`, so React always knows
what the user typed. `event.preventDefault()` stops the page reload on submit.

**9. CSS and the design system**
Each component imports its own `.css` file. Colors are CSS variables in `global.css`;
dark mode only swaps the variable values. Responsive layout uses `@media` queries
(900px and 768px breakpoints). Grids use `repeat(auto-fill, minmax(300px, 1fr))`, which
changes the number of columns by itself, with no media query.

Design choices: one brand color (ultramarine) plus a yellow accent, Bricolage Grotesque for
headings and Hanken Grotesk for text, thin borders instead of heavy shadows, left-aligned layout,
sticky navbar. All colors are variables at the top of `global.css`, so the whole look can be
re-themed by changing a few lines.

## Accounts, cart, coupons and checkout

**Context API (`src/context/`)** - shared data without passing props through many levels.
- `AuthContext.jsx`: `user`, `signUp`, `signIn`, `signOut`, and the sign in popup (`openAuth`).
- `CartContext.jsx`: the cart, the coupon, the saved orders, `addToCart`, `buyNow`, `applyCoupon`, `placeOrder`.
- `main.jsx` wraps the app in both providers; any component reads them with `useAuth()` / `useCart()`.

**Sign in / Create account** (`AuthModal.jsx`)
Email + password with validation messages, a Show/Hide button and a password strength meter.
Passwords are hashed (SHA-256 + random salt, `crypto.subtle`) and never stored as plain text.
Accounts and the session live in `localStorage`. This is a demo: real authentication needs a server.

**Cart** (`pages/Cart.jsx`)
"Add to cart" on every course card (the button becomes "Go to cart" or "Enrolled"), a badge on the
navbar cart icon, a toast message, and the cart is saved in `localStorage`.

**Coupons** (`data/coupons.js`)
Add your own coupon by adding one line. Rules: percent or flat amount, `minTotal`, `minItems`.
Try `EDU10`, `STUDENT20` (cart over 4000), `WELCOME500` (cart over 2500), `BUNDLE25` (3+ courses).
The discount is recalculated on every render, so it can never be out of date.

**Checkout** (`pages/Checkout.jsx`)
Guarded by `RequireAuth` (signed-out users see a Sign in message). Billing details with phone
validation, the UPI QR placeholder (`QrPayment.jsx`), then `idle -> verifying -> paid`.
The order is saved, the cart is emptied, and `pages/Orders.jsx` lists "My orders".
To use your real QR code, replace the `qr-placeholder` div in `QrPayment.jsx` with an `<img>`.

**Promise: payment verification** (`utils/payment.js`, `pages/Checkout.jsx`)
`verifyPayment()` returns `new Promise((resolve, reject) => ...)`. After 1.5 s it calls `resolve`
(payment accepted) or `reject` (for example the browser is offline). `Checkout.jsx` handles both:
`.then()` saves the order, `.catch()` shows the error message and lets the user retry.
A ref (`isMounted`) stops the code from running if the user leaves the page while it is waiting.
Sign in / sign up also use `async` / `await`, which is a shorter way to write the same promises.

## Quick edits

- **Your QR code:** copy your image to `public/images/upi-qr.png`, then in `src/components/QrPayment.jsx`
  replace the line `<div className="qr-placeholder">...</div>` with
  `<img src="/images/upi-qr.png" alt="UPI QR code" className="qr-image" />`.
  Change the text `UPI ID: yourname@upi` in the same file.
- **Coupon codes:** `src/data/coupons.js` (one line per coupon).

**Hero image slider** (`components/HeroSlider.jsx`)
All slides sit side by side in a long "track". State `index` says which slide to show, and CSS slides
the track left by `index x 100%`. `useEffect` + `setInterval` moves to the next slide every 3.5 s and
pauses while the mouse is over it (state `paused`). The dots jump to a slide.

**Count-up numbers** (`components/CountUp.jsx`)
Waits until the number is visible (`useInView`), then `requestAnimationFrame` runs about 60 times a
second and shows a growing share of the final number ("ease out" so it slows down at the end).

**Learning page, like Coursera** (`pages/Learn.jsx`, `pages/MyCourses.jsx`, `data/lessons.js`)
- Bought course -> `/my-courses` (progress bars) -> `/learn/python` -> topics (modules) -> lessons (YouTube videos).
- `data/lessons.js` holds course -> topics -> lessons. Each lesson has a YouTube video ID.
- The player is a YouTube `<iframe>`. Lesson ids like `2-3` are in the address (`/learn/python/2-3`),
  so the Back button and refresh work.
- State: `progress` (completed lesson ids + last lesson), the open tab, the notes text, the open topics.
  Progress and notes are saved per user in `localStorage` (`utils/progress.js`).
- Two guards: `RequireAuth` (signed in?) and `LearnGate` (did you buy this course?).

**CHECK THE VIDEOS BEFORE YOUR DEMO:** run `npm run check-videos` (needs internet). It opens every
video ID on YouTube and prints OK + the video title, or FAIL. Replace any failed `video` ID in
`src/data/lessons.js` with the ID from another YouTube video (the part after `watch?v=`).

**Scroll pop-in animation** (`hooks/useInView.js`, `CourseCard.jsx`)
A custom hook with `useRef` + `IntersectionObserver`: when a card enters the screen, state
`isVisible` becomes true, React adds the class `visible`, and CSS fades and scales it in (once).

## What changed from the original HTML

- 6 near-identical course pages -> 1 `CourseDetail` page + 1 data file.
- The CSS-checkbox hacks (dark mode, menu, newsletter) -> real React state.
- The FAQ `<details>` tags -> a React accordion (one answer open at a time).
- Course pages share the same Navbar and Footer as the other pages.
- The search box filters courses (`/courses?search=python`); the Courses page has category buttons.
- The Feedback form shows a thank-you message after submitting.
- Full visual redesign (colors, fonts, layout, course cards with price/level/duration/rating).
- The 12 MB cloud image was resized (to 270 KB) so the site loads fast.
