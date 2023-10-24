'use client';
import { useDimensions } from '@/hooks/use-dimensions';
import { IRootState } from '@/store';
import { motion, useCycle } from 'framer-motion';
import React, { useMemo, createContext } from 'react';
import { useSelector } from 'react-redux';

export const AnimationContext = createContext(() => {});

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
  const [isOpen, toggle] = useCycle(false, true);

  React.useEffect(() => (isMobile ? toggle() : () => {}), []);

  const animateVariant = isOpen ? 'open' : 'closed';

  const contextValue = useMemo(() => {
    return () => toggle();
  }, []);

  return (
    <AnimationContext.Provider value={contextValue}>
      <motion.header
        initial={isMobile}
        animate={isMobile ? animateVariant : 'open'}
        custom={height}
        variants={sidebar}
        ref={containerRef}
        className={wrapperClass ?? ''}
      >
        {children}
      </motion.header>
    </AnimationContext.Provider>
  );
};

export default AnimationEntry;
