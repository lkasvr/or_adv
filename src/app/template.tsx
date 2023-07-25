'use client';
import { usePathname } from 'next/navigation'
import Transition from '@/components/Transition';
import { motion, AnimatePresence } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathName} className="h-full w-full">
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
