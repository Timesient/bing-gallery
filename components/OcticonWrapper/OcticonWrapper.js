import { useState } from "react"

export default function OcticonWrapper({ className = "", Icon, size, fill = "#000", fillOnHover = fill, onClick }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <span
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon size={size} fill={isHover ? fillOnHover : fill} />
    </span>
  )
}