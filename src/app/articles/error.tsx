'use client';
import WarningCard from '@/components/WarningCard';
import * as Sentry from '@sentry/nextjs';
import React from 'react';

export default function Erro({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => {
    if (!error) return;
    (async () => {
      const transaction = Sentry.startTransaction({
        name: 'Index App Route Frontend Transaction - (error.tsx)',
      });

      Sentry.configureScope((scope) => scope.setSpan(transaction));

      try {
        throw new Error(`${error.name}: ${error.message}`, {
          cause: error,
        });
      } finally {
        transaction.finish();
      }
    })();
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
