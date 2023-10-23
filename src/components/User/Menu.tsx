'use client';
import { motion } from 'framer-motion';
import type { Variants, MotionProps } from 'framer-motion';
import { signOut } from 'next-auth/react';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
} satisfies Variants;

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },
  transition: { opacity: { duration: 0.2 } },
} satisfies MotionProps;

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <section className="user-menu relative">
      <div
        className="backdrop:inline-flex items-center overflow-hidden"
        onClick={() => setOpen((prevState) => !prevState)}
        onMouseOver={() => setOpen(true)}
      >
        <a href="#" className="block shrink-0">
          <span className="sr-only">Profile</span>
          {/* <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          /> */}
        </a>
      </div>

      <motion.div
        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
        initial="closed"
        animate={open ? 'open' : 'closed'}
        exit="closed"
        variants={menu}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="p-2">
          <motion.button
            {...item}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Perfil
          </motion.button>

          <motion.button
            {...item}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            View Warehouse Info
          </motion.button>

          <motion.button
            {...item}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Duplicate Product
          </motion.button>

          <motion.button
            {...item}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Unpublish Product
          </motion.button>
        </div>

        <div className="p-2">
          <motion.button
            {...item}
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            role="menuitem"
            onClick={() =>
              signOut({ redirect: true, callbackUrl: '/articles' })
            }
          >
            <AiOutlineLogout className="h-5 w-5" />
            Sair
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Menu;
