'use client';
import React from 'react';

interface IBadge {
  text: string;
  extendedClass: string;
}

const Badge = ({ text, extendedClass }: IBadge) => {
  return (
    <span
      className={`whitespace-nowrap max-h-6 rounded-md px-2 py-0.5 text-xs md:text-sm/relaxed ${extendedClass}`}
    >
      {text}
    </span>
  );
};

export default Badge;
