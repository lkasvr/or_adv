'use client';
import { IRootState } from '@/store';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import MenuButton from '../MenuButton';
import { AnimationContext } from './AnimationEntry';

interface Props {
  links: { text: string; href: string }[];
}

const MenuButtons = ({ links }: Props) => {
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const toggleMenu = useContext(AnimationContext);

  return (
    <ul className="w-full flex flex-row flex-wrap justify-center text-lg">
      {links.map(({ text, href }) => (
        <MenuButton
          key={text}
          onClick={() => (isMobile ? toggleMenu() : null)}
          text={text}
          href={href}
        />
      ))}
    </ul>
  );
};

export default MenuButtons;
