// Framer Motion
import { motion } from 'framer-motion';
import React from 'react';

// Variants
const transitionVariantes = {
  initial: {
    x: '100%',
    with: '100%',
  },
  animate: {
    x: '0%',
    with: '0%',
  },
};

const Transition = () => {
  return (
    <React.Fragment>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-secondary"
        variants={transitionVariantes}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0, duration: 1, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-primary"
        variants={transitionVariantes}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
      ></motion.div>
    </React.Fragment>
  );
};

export default Transition;
