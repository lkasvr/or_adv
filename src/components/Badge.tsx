'use client';
import React from 'react';

interface IBadge {
  text: string;
  extendedClass: string;
}

const Badge = ({ text, extendedClass }: IBadge) => {
  return (
    <span
      className={`whitespace-nowrap max-h-6 flex justify-center items-center rounded-md px-2 py-0.5 text-sm ${extendedClass}`}
    >
      {text}
    </span>
  );
};

export default Badge;
