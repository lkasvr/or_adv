import Button from '@/components/Button';
import React from 'react';

export default async function Page() {
  return (
    <div>
      Você está logado e foi autorizado a ficar, seja bem vindo!
      <Button text="Sair" />
    </div>
  );
}
