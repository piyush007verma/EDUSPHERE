// =====================================================================
// pages/Feedback.jsx  -  feedback form built with a "controlled form"
//
// Controlled form = React keeps every input's value in STATE.
//   - the input SHOWS what is in state   (value={form.name})
//   - typing UPDATES the state           (onChange={handleChange})
// So React always knows exactly what the user has typed.
// =====================================================================
import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { courses } from "../data/courses.js";
import "./Feedback.css";

// How the form looks when it is empty
const emptyForm = { name: "", email: "", course: "", message: "" };

export default function Feedback() {
  // STATE 1: the values of all four fields, stored together in one object
  const [form, setForm] = useState(emptyForm);
  // STATE 2: has the form been sent? (decides which screen we show)
  const [submitted, setSubmitted] = useState(false);

  // One function handles ALL inputs. Each input has a `name` attribute
  // ("name", "email", "course", "message") that matches a key in `form`.
  function handleChange(event) {
    const { name, value } = event.target;
    // { ...form } copies the old values, then [name]: value replaces only the changed one
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    // The browser already checked "required", the email format and minLength.
    // In a real project we would send `form` to a server here.
    console.log("Feedback received:", form);
    setSubmitted(true);
  }

  // Send another response: empty the form and show it again
  function resetForm() {
    setForm(emptyForm);
    setSubmitted(false);
  }

  return (
    <>
      <PageHero
        title="We value your feedback"
        subtitle="Help us improve EduSphere by sharing your learning experience."
      />

      <section className="section">
        <div className="feedback-container">
          {submitted ? (
            // ---------- Thank-you screen ----------
            <div className="feedback-success">
              <div className="success-icon">✓</div>
              <h3>Thank you, {form.name}!</h3>
              <p>Your feedback has been received. It helps us make EduSphere better.</p>
              <button className="btn btn-outline" onClick={resetForm}>
                Send another response
              </button>
            </div>
          ) : (
            // ---------- The form ----------
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="course">Which course did you take?</label>
                <select
                  id="course"
                  name="course"
                  className="form-control"
                  value={form.course}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a course</option>
                  {/* One <option> per course, created from our data */}
                  {courses.map((course) => (
                    <option key={course.slug} value={course.slug}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your feedback</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Tell us what you liked and what we can improve..."
                  value={form.message}
                  onChange={handleChange}
                  minLength={10}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send feedback</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
