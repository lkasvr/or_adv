'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';

interface Props {
  text?: string;
  distance?: number;
}

const ScrollDownIcon = ({ text }: Props) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAnimationComplete = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={{
            initial: {
              y: 0,
              opacity: 1,
            },
            target: {
              y: 30,
              opacity: 0.2,
            },
          }}
          initial="initial"
          animate="target"
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 1,
            repeat: 4,
            repeatType: 'mirror',
            repeatDelay: 0,
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onAnimationComplete={handleAnimationComplete}
          className="mb-2 flex flex-row flex-nowrap justify-between gap-2"
        >
          <span className="text-xs text-primary">{text}</span>
          <BsChevronDoubleDown className="text-primary w-6 h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollDownIcon;
