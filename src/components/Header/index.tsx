'use client';
import Button from '@/components/Button';
import { useDimensions } from '@/hooks/use-dimensions';
import { IRootState } from '@/store';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logoFb from 'public/assets/logoFb.png';
import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
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
      <nav className="w-full max-md:h-4/5 flex flex-wrap justify-center md:gap-14">
        <Link
          href="/"
          className="grow w-auto h-auto max-w-[260px] max-h-[149px]"
        >
          <Image
            src={logoFb}
            priority
            sizes="100vw"
            className="appearance-none"
            alt="Logo OR Advogados"
          />
        </Link>

        <ul className="w-full flex flex-row flex-wrap justify-center text-lg">
          {menuLinks.map(({ text, href }) => (
            <li key={text}>
              <Button
                key={text}
                onClick={() => (isMobile ? toggleOpen() : null)}
                text={text}
                href={href}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full max-sm:h-[15%] max-sm:mb-0 mt-12 h-6 mb-6 p-4 flex flex-row flex-nowrap justify-center border-t border-primary/25">
        <a
          href="https://wa.link/ma6kwv"
          target="_blank"
          rel="noreferrer"
          aria-label="Acesse nossas mídias sociais - LinkedIn"
        >
          <BsWhatsapp className="w-6 h-6 mr-4" />
        </a>
        <FiLinkedin className="w-6 h-6 mr-4" />
        <a
          href="https://www.instagram.com/oliveirariosadvogados/"
          target="_blank"
          rel="noreferrer"
          aria-label="Acesse nossas mídias sociais - Instagram"
        >
          <FiInstagram className="w-6 h-6" />
        </a>
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
            aria-label="Endereço no Google Maps"
          >
            <div>
              <FiMapPin />
            </div>
            &nbsp; SHS Quadra 6, conjunto A, bloco A, sala 501, Complexo Brasil
            21, Asa Sul, Brasília - DF
          </a>
        </div>

        <p className="w-full mt-4 md:mt-6 flex justify-center">
          Copyright &copy; {new Date().getFullYear()} | Oliveira Rios Advogados
        </p>
      </footer>
    </motion.header>
  );
}

export default HeaderWithFooter;
