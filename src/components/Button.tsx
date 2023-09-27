'use client';
import React from 'react';

interface IButton {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: IButton) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
