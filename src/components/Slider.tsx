'use client';
import React from 'react';
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

export const Slider = () => {
  return (
    <Swiper
      style={{
        width: '96%',
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
              <ul className="w-full max-h-max text-left text-xs border-l">
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
  );
};
