'use client';
import { useDimensions } from '@/hooks/use-dimensions';
import { IRootState } from '@/store';
import { motion, useCycle } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

import { MenuButtonToggle } from './MenuButtonToggle';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const AnimationEntry = ({
  children,
  wrapperClass,
}: {
  children: React.ReactNode;
  wrapperClass?: string;
}) => {
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const containerRef = React.useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  React.useEffect(() => (!isMobile ? toggleOpen() : () => {}), []);

  const animateVariant = isOpen ? 'open' : 'closed';

  console.log(isMobile, isOpen, animateVariant);

  return (
    <motion.header
      initial={isMobile}
      animate={isMobile ? animateVariant : 'open'}
      custom={height}
      variants={sidebar}
      ref={containerRef}
      className={wrapperClass ?? ''}
    >
      <MenuButtonToggle
        className="absolute md:hidden top-[31px] left-[29px]"
        toggle={() => toggleOpen()}
      />
      {children}
    </motion.header>
  );
};

export default AnimationEntry;
