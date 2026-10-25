// =====================================================================
// FAQ.jsx  -  accordion: click a question to open / close its answer
// =====================================================================
import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { faqs } from "../data/siteContent.js";
import "./FAQ.css";

export default function FAQ() {
  // STATE: which question is open?
  //   null -> all closed        0 -> the first one is open, 1 -> the second ...
  // Because we store ONE number, only one answer can be open at a time.
  const [openIndex, setOpenIndex] = useState(null);

  // Clicking the open question closes it (null). Otherwise open the clicked one.
  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="section faq-layout" id="faq">
      {/* Left: heading.  Right: the questions */}
      <SectionHeader
        title="Frequently asked questions"
        subtitle="Got questions? We've got answers."
      />

      <div className="faq-container">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index; // is THIS question the open one?

          return (
            <div className={isOpen ? "faq-item open" : "faq-item"} key={item.question}>
              <button
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                {item.question}
              </button>

              {/* The answer is only drawn while isOpen is true */}
              {isOpen && <div className="faq-content">{item.answer}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
