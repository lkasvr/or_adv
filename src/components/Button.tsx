'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface IButton {
  text: string;
  href: string;
  extendClass?: string;
}

const selectedButton =
  'shadow-none cursor-pointer bg-primary text-white -translate-y-1 scale-110';

function Button({ text, href, extendClass }: IButton) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`w-3/4 flex justify-center items-center mb-5 p-2 border border-primary shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primary hover:text-white
      ${pathname === href ? selectedButton : 'text-primary'} ${extendClass}`}
    >
      {text}
    </Link>
  );
}

export default Button;
