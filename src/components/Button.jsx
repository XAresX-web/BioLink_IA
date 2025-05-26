import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, to, onClick, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2
      bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold
      px-6 py-3 rounded-xl shadow-md hover:brightness-110 transition-all
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
