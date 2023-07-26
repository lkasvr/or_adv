import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import { FiInstagram, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

import logoFb from '../../public/assets/logoFb.png';

const menuLinks = [
  { text: 'Página Inicial', href: '/' },
  { text: 'Escritório', href: '/about' },
  { text: 'Artigos', href: '/articles' },
  { text: 'Pro Bono', href: '/probono' },
  { text: 'Contato', href: '/contact' },
];

function HeaderWithFooter() {
  return (
    <header className="z-40 h-screen w-3/12 bg-white p-10 flex flex-row flex-wrap justify-between">
      <nav className="w-full flex flex-wrap justify-center gap-6">
        <Image
          src={logoFb}
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
            <Button key={text} text={text} href={href} />
          ))}
        </ul>
      </nav>
      <footer className="w-full border-t border-primary/25 p-4 self-end flex flex-row flex-wrap text-xs">
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
    </header>
  );
}

export default HeaderWithFooter;
