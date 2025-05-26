
import React from "react"

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2
  bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold
  px-6 py-3 rounded-xl shadow-md hover:brightness-110 transition-all
  ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
