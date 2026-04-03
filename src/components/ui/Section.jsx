export default function Section({ number, title, children }) {
  return (
    <div className="section">
      {title && (
        <h3 className="section-title">
          {number && <span className="section-number">{number}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
