'use client';
import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import MenuButton from '../MenuButton';
import { AnimationContext } from './AnimationEntry';

interface Props {
  logo: React.ReactNode;
  links: { text: string; href: string }[];
}

const Menu = ({ logo, links }: Props) => {
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const toggleMenu = useContext(AnimationContext);
  const handleToggleMenu = () => (isMobile ? toggleMenu() : null);

  return (
    <nav className="w-full max-md:h-4/5 flex flex-wrap justify-center md:gap-14">
      <Link
        href="/"
        className="grow w-auto h-auto max-w-[260px] max-h-[149px]"
        onClick={handleToggleMenu}
      >
        {logo}
      </Link>
      <ul className="w-full flex flex-row flex-wrap justify-center text-lg">
        {links.map(({ text, href }) => (
          <MenuButton
            key={text}
            onClick={handleToggleMenu}
            text={text}
            href={href}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
