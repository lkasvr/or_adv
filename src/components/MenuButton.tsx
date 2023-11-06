'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface IButton {
  text: string;
  href: string;
  extendClass?: string;
  onClick?: () => void;
}

const selectedButton =
  'shadow-none cursor-pointer bg-primary text-white -translate-y-1 scale-110';

const MenuButton = ({ text, href, extendClass, onClick }: IButton) => {
  const pathname = usePathname().slice(0, 9);

  return (
    <li
      className={`${extendClass} w-3/4 flex justify-center items-center mb-5 p-2 border border-primary shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primary hover:text-white
      ${pathname === href ? selectedButton : 'text-primary'}`}
      onClick={onClick}
    >
      <Link
        className="w-full h-full flex justify-center items-center"
        href={href}
      >
        {text}
      </Link>
    </li>
  );
};

export default MenuButton;
