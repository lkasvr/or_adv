'use client';
import Transition from '@/components/Transition';
import { motion, AnimatePresence } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div className="h-full w-full">
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
