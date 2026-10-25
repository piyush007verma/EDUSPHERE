// =====================================================================
// Modal.jsx  -  the SHARED popup window (dark overlay + white box).
// AuthModal uses it (and any future popup can too), so popups behave the same:
//   - clicking the dark area closes it
//   - pressing the Escape key closes it
//   - the page behind cannot scroll while it is open
// `children` = whatever is placed between <Modal> ... </Modal>
// =====================================================================
import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // lock page scrolling

    // Cleanup runs when the modal closes: undo both things above
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    // Clicking the overlay closes the modal...
    <div className="modal-overlay" onClick={onClose}>
      {/* ...but clicking INSIDE the white box must not (stopPropagation) */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  );
}
