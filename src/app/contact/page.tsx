import ContactForm from '@/components/Form/ContactForm';
import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-row flex-nowrap justify-evenly p-4 xl:px-9 w-full h-full border rounded-2xl">
      <ContactForm title="Fale conosco" />
    </div>
  );
}
