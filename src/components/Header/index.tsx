'use client';
import Button from '@/components/Button';
import { useDimensions } from '@/hooks/use-dimensions';
import { IRootState } from '@/store';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import logoFb from 'public/assets/logoFb.png';
import React from 'react';
import {
  FiLinkedin,
  FiInstagram,
  FiPhone,
  FiMapPin,
  FiMail,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';

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
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const containerRef = React.useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  React.useEffect(() => (!isMobile ? toggleOpen() : () => {}), []);

  const animateVariant = isOpen ? 'open' : 'closed';

  return (
    <motion.header
      initial={isMobile}
      animate={isMobile ? animateVariant : 'open'}
      custom={height}
      variants={sidebar}
      ref={containerRef}
      className="absolute md:static p-6 xl:p-10 z-40 h-screen w-full md:w-4/12 xl:w-3/12 bg-white flex flex-row flex-wrap justify-between overflow-auto scrollbar-none"
    >
      <MenuToggle
        className="absolute md:hidden top-[31px] left-[29px]"
        toggle={() => toggleOpen()}
      />
      <nav className="w-full max-sm:h-[85%] flex flex-wrap justify-center gap-14">
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

      <div className="w-full max-sm:h-[15%] max-sm:mb-0 mt-12 h-6 mb-6 p-4 flex flex-row flex-nowrap justify-center border-t border-primary/25">
        <FiLinkedin className="w-6 h-6 mr-4" />
        <FiInstagram className="w-6 h-6" />
      </div>

      <footer className="w-full overflow-hidden p-4 self-end flex flex-row flex-wrap text-xs">
        <div className="w-full lg:w-1/2 mb-2">
          <b className="w-full text-center">Telefone:</b>
          <div className="flex flex-row flex-nowrap">
            <div>
              <FiPhone />
            </div>
            &nbsp;(61) 2107-9419
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-2">
          <b className="w-full text-center">Email:</b>
          <span className="flex flex-row flex-nowrap">
            <div>
              <FiMail />
            </div>
            &nbsp;atendimento@oliveirarios.adv.br
          </span>
        </div>

        <div className="w-full">
          <b className="w-full text-center">Endereço:</b>{' '}
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

        <p className="w-full mt-4 md:mt-6 flex justify-center">
          Copyright &copy; 2023 | Oliveira Rios Advogados
        </p>
      </footer>
    </motion.header>
  );
}

export default HeaderWithFooter;
