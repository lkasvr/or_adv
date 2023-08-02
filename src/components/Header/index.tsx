'use client';
import Button from '@/components/Button';
import { useDimensions } from '@/hooks/use-dimensions';
import { useMediaQuery } from '@react-hook/media-query';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import logoFb from 'public/assets/logoFb.png';
import React from 'react';
import { FiInstagram, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

import { MenuToggle } from './MenuToggle';

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

const menuLinks = [
  { text: 'Página Inicial', href: '/' },
  { text: 'Escritório', href: '/about' },
  { text: 'Artigos', href: '/articles' },
  { text: 'Pro Bono', href: '/probono' },
  { text: 'Contato', href: '/contact' },
];

function HeaderWithFooter() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = React.useRef(null);
  const { height } = useDimensions(containerRef);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const animateVariant = isMobile ? (isOpen ? 'open' : 'closed') : 'open';

  return (
    <motion.header
      initial={false}
      animate={animateVariant}
      custom={height}
      variants={sidebar}
      ref={containerRef}
      className="absolute md:static z-40 h-screen w-full md:w-3/12 bg-white p-10 flex flex-row flex-wrap justify-between"
    >
      <MenuToggle
        className="absolute md:hidden top-[31px] left-[29px]"
        toggle={() => toggleOpen()}
      />
      <nav className="w-full flex flex-wrap justify-center gap-6">
        <Image
          src={logoFb}
          priority
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '260px',
            maxHeight: '149px',
          }}
          className="grow"
          alt="Logo OR Advogados"
        />
        <ul className="w-full flex flex-row flex-wrap justify-center text-lg">
          {menuLinks.map(({ text, href }) => (
            <Button
              key={text}
              onClick={() => (isMobile ? toggleOpen() : null)}
              text={text}
              href={href}
            />
          ))}
        </ul>
      </nav>
      <footer className="w-full overflow-hidden border-t border-primary/25 p-4 self-end flex flex-row flex-wrap text-xs">
        <div className="w-full h-6 mb-6 flex flex-row flex-nowrap justify-center">
          <FiInstagram className="w-6 h-6" />
        </div>
        <div className="w-1/2 mb-2">
          <b>Telefone:</b>
          <div className="flex flex-row flex-nowrap">
            <div>
              <FiPhone />
            </div>
            &nbsp;(61) 2107-9419
          </div>
        </div>
        <div className="w-1/2 mb-2">
          <b>Email:</b>
          <div className="flex flex-row flex-nowrap">
            <div>
              <FiMail />
            </div>
            &nbsp;atendimento@oliveirarios.adv.br
          </div>
        </div>
        <div className="w-full">
          <b>Endereço:</b>{' '}
          <a
            href="https://goo.gl/maps/1Zm88MR5VpABwLVe6"
            target="_blank"
            rel="noreferrer"
            className="flex flex-row flex-nowrap"
          >
            <div>
              <FiMapPin />
            </div>
            &nbsp; SHS Quadra 6, conjunto A, bloco A, sala 501, Complexo Brasil
            21, Asa Sul, Brasília - DF
          </a>
        </div>
        <p className="w-full mt-6 flex justify-center">
          Copyright &copy; 2023 | Oliveira Rios Advogados
        </p>
      </footer>
    </motion.header>
  );
}

export default HeaderWithFooter;
