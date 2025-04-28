import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg hover:bg-[#ae7aff]/90 border border-transparent hover:border-white hover:border-dotted ${bgColor} ${textColor} ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button