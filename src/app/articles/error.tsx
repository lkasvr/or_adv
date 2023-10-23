'use client';

import WarningCard from '@/components/WarningCard';
import React from 'react';

export default function Erro({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <WarningCard title="Opa, algum erro ocorreu.." resetFunction={reset}>
      <b>{error.name}</b>
      <br />
      {error.message.toString()}
    </WarningCard>
  );
}
