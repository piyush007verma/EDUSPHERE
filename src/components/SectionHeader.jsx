// =====================================================================
// SectionHeader.jsx  -  "Title + one sentence" above each section.
// `children` = anything placed between the tags, e.g. a link on the right:
//   <SectionHeader ...> <Link>View all</Link> </SectionHeader>
// (Its CSS is in styles/global.css)
// =====================================================================
export default function SectionHeader({ title, subtitle, children }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
