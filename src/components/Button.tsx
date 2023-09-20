'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

interface IButton {
  text: string;
  onClick?: () => void;
}

const Button = ({ text }: IButton) => {
  return (
    <button onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>
      {text}
    </button>
  );
};

export default Button;
