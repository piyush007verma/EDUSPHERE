// =====================================================================
// ScrollToTop.jsx  -  a tiny helper with NO visible output.
//
// In a normal website every link loads a new page, which starts at the
// top. In React the page does not reload, so the old scroll position
// would stay. This component scrolls to the top on every page change.
// =====================================================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // useLocation() gives the current URL path, e.g. "/courses/python"
  const { pathname } = useLocation();

  // Run again every time the path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // draws nothing
}
