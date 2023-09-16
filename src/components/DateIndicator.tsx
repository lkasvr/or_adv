import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';

interface ILastUpdate {
  legend: string;
  date: string;
}

const DateIndicator = ({ legend, date }: ILastUpdate) => {
  return (
    <span className="mt-4 text-sm font-medium text-primary">
      {legend}{' '}
      {formatDistance(new Date(date), new Date(), {
        addSuffix: true,
        locale: ptBR,
      })}
    </span>
  );
};

export default DateIndicator;
