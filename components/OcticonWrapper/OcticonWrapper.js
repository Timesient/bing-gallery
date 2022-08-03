import { useState } from "react"

export default function OcticonWrapper({ className = "", title = "", Icon, size, fill = "#000", fillOnHover = fill, onClick }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <span
      title={title}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon size={size} fill={isHover ? fillOnHover : fill} />
    </span>
  )
}