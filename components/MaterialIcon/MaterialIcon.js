export default function MaterialIcon({ children, className, size, onClick }) {
  return (
    <span
      className={`${className || ''} material-symbols-outlined`}
      style={{
        width: `${size || 24}px`,
        height: `${size || 24}px`,
        fontSize: `${size || 24}px`,
        overflow: "hidden"
      }}
      onClick={onClick}
    >
      {children}
    </span>
  )
}