'use client';
import { IRootState } from '@/store';
import { useCycle } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

import MenuButton from '../MenuButton';

interface Props {
  links: { text: string; href: string }[];
}

const MenuButtons = ({ links }: Props) => {
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const [, toggleOpen] = useCycle(false, true);

  React.useEffect(() => (!isMobile ? toggleOpen() : () => {}), []);

  return (
    <ul className="w-full flex flex-row flex-wrap justify-center text-lg">
      {links.map(({ text, href }) => (
        <MenuButton
          key={text}
          onClick={() => (isMobile ? toggleOpen() : null)}
          text={text}
          href={href}
        />
      ))}
    </ul>
  );
};

export default MenuButtons;
