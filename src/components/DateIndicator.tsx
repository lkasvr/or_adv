import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';

interface ILastUpdate {
  legend: string;
  date: string;
  wrapperClass?: string;
}

const DateIndicator = ({ legend, date, wrapperClass }: ILastUpdate) => {
  return (
    <span
      className={
        !wrapperClass ? 'mt-4 text-sm font-medium text-primary' : wrapperClass
      }
    >
      {legend}{' '}
      {formatDistance(new Date(date), new Date(), {
        addSuffix: true,
        locale: ptBR,
      })}
    </span>
  );
};

export default DateIndicator;
