'use client';
//import Image from 'next/image';
import {
  FaPenNib,
  FaUserGroup,
  FaCartShopping,
  FaHandcuffs,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
// import required modules
import {
  Autoplay,
  EffectCards,
  //  EffectCoverflow,
  //  Pagination,
} from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import Image from 'next/image';

const items = [
  {
    id: 0,
    title: 'Administrativo',
    activityType: ['Contencioso judicial', 'Administrativo'],
    activities: [
      'PAD - Processo Administrativo Disciplinar',
      'Concursos Públicos',
      'INSS – benefícios',
      'Improbidade Administrativa',
      'Licitações',
    ],
    icon: <FaPenNib className="w-12 h-12" />,
    styles: 'bg-gray-dark text-white',
  },
  {
    id: 1,
    title: 'Cível',
    activityType: ['Contencioso judicial', 'Consultoria'],
    activities: [
      'Inventário (judicial e/ou extrajudicial)',
      'Divórcio (judicial e/ou extrajudicial)',
      'Guarda de filhos menores',
      'Contratos',
      'Imobiliário',
      'Ações em geral',
    ],
    icon: <FaUserGroup className="w-12 h-12" />,
    styles: 'bg-secondary text-white',
  },
  {
    id: 2,
    title: 'Consumidor',
    activityType: ['Contencioso judicial', 'Consultoria'],
    activities: ['Ações judiciais', 'Demandas administrativas'],
    icon: <FaCartShopping className="w-12 h-12" />,
    styles: 'bg-white text-black',
  },
  {
    id: 3,
    title: 'Criminal',
    activityType: ['Contencioso judicial', 'Administrativo'],
    activities: ['Ações judiciais', 'Inquéritos'],
    icon: <FaHandcuffs className="w-12 h-12" />,
    styles: 'bg-secondary text-white',
  },
  {
    id: 4,
    title: 'Trabalhista',
    activityType: ['Contencioso judicial', 'Consultoria'],
    activities: ['Colaboradores', 'Empregadores'],
    icon: <FaScrewdriverWrench className="w-12 h-12" />,
    styles: 'bg-gray-dark text-white',
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-row flex-wrap xl:flex-nowrap justify-center overflow-auto max-md:scrollbar-none">
      <article className="p-4 2xl:p-9 w-full md:w-2/5 flex flex-row flex-wrap justify-center content-center gap-0 text-white">
        <span className="text-lg">
          Somos o escritório
          <h2 className="mb-6 mt-2 ml-4 text-center text-lg md:text-xl font-bold">
            OLIVEIRA & RIOS – ADVOGADOS
          </h2>
        </span>
        <p className="mb-6 text-justify indent-8">
          Atuamos junto aos <b>Tribunais Superiores</b> (STF e STJ),{' '}
          <b>Justiça Federal</b> e <b>Tribunais de Justiça</b>, bem como no
          âmbito da <b>Administração Pública direta e indireta</b>.
        </p>
        <p className="mb-6 text-justify indent-8">
          O escritório tem sede no Distrito Federal e é coordenado pelos sócios{' '}
          <b>André Viana de Oliveira</b> e <b>Lucimara Vieira Rios</b>.
        </p>
        <p className="mb-6 text-justify indent-8">
          Por ser um escritório <b>full service</b> e manter parceria com outros
          escritórios e advogados fora do DF, atendemos em todo o território
          nacional.
        </p>
        <Swiper
          style={{
            width: '100%',
            height: '30%',
          }}
          grabCursor={true}
          effect={'cards'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCards]}
          className="mySwiper"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="rounded-xl min-h-min">
              <div
                className={`${item.styles} font-bold w-full h-full flex flex-row flex-wrap justify-center items-center p-6`}
              >
                <h3 className="w-full text-left text-xl">{item.title}</h3>
                {item.icon}
                <div className="w-full p-2 flex flex-row justify-between">
                  <ul className="w-full text-left text-xs border-l">
                    {item.activities.map((activity) => (
                      <li className="ml-4" key={activity}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
      <hr className="w-10/12 h-[1px] md:w-[1px] md:h-2/3 place-self-center bg-white" />
      <div className="p-10 w-[66.6%] flex flex-row flex-wrap justify-center items-start">
        <a href="#" className="block mt-2">
          <Image
            alt="Brasil 21"
            src="/assets/images/brasil21_diurna.jpg"
            width={4110}
            height={2740}
            className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-72"
          />

          <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4 text-white">
            <strong className="font-medium">Complexo Brasil 21</strong>

            <span className="hidden sm:block sm:h-[2px] sm:w-8 sm:bg-secondary"></span>

            <p className="mt-0.5 opacity-50 sm:mt-0">Plano Piloto</p>
          </div>
        </a>
      </div>
    </div>
  );
}
