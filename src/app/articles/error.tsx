'use client';

import WarningCard from '@/components/WarningCard';
import logger from '@/services/logger/winston';
import React from 'react';

export default function Erro({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => {
    logger.error({ error });
  }, [error]);

  return (
    <WarningCard
      title="Opa, algum erro ocorreu.."
      button={{ text: 'reset' }}
      resetFunction={reset}
    >
      <b>{error.name}</b>
      <br />
      <p> {error.message.toString()}</p>
    </WarningCard>
  );
}
