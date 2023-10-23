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

import Animation from './Animation';
import MenuButtons from './MenuButtons';

const menuLinks = [
  { text: 'Escritório', href: '/about' },
  { text: 'Artigos', href: '/articles' },
  { text: 'Pro Bono', href: '/probono' },
  { text: 'Contato', href: '/contact' },
];

const HeaderWithFooter = () => {
  return (
    <Animation wrapperClass="absolute md:static p-6 xl:p-10 z-40 h-screen w-full md:w-4/12 xl:w-3/12 bg-white flex flex-row flex-wrap justify-between overflow-auto scrollbar-none">
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
        <MenuButtons links={menuLinks} />
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
    </Animation>
  );
};

export default HeaderWithFooter;
