import React from 'react';

const VerifiedBadge = ({ size = 20, style = {} }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        marginLeft: '4px',
        ...style 
      }}
    >
      <path 
        d="M24 12.01L21.36 8.99L21.73 4.96L17.79 4.05L15.68 0.63L12 2.21L8.32 0.63L6.21 4.05L2.27 4.96L2.64 8.99L0 12.01L2.64 15.03L2.27 19.06L6.21 19.97L8.32 23.39L12 21.81L15.68 23.39L17.79 19.97L21.73 19.06L21.36 15.03L24 12.01Z" 
        fill="#24A1DE" 
      />
      <path 
        d="M10.23 16.5L6.45 12.72L7.86 11.31L10.23 13.68L16.14 7.77L17.55 9.18L10.23 16.5Z" 
        fill="white" 
      />
    </svg>
  );
};

export default VerifiedBadge;
