import Loading from '@/components/Loading';
import React from 'react';

interface IFormButton {
  text: string;
  isDisabled?: boolean;
  extendClass?: string;
  onClick?: () => void;
}

function FormButton({ text, isDisabled, extendClass, onClick }: IFormButton) {
  return (
    <button
      className={`mt-1 mb-1 2xl:mt-5 2xl:mb-5 p-2 justify-self-center flex justify-center items-center text-gray-300 bg-secondary/60 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:bg-secondary disabled:text-gray-600 disabled:bg-secondary/20 ${extendClass}`}
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
    >
      {isDisabled ? (
        <div className="w-full flex flex-row justify-center" role="status">
          <Loading type="spin" width={32} height={32} />
          &nbsp;
          {/* <span className="flex justify-center items-center">Enviando...</span> */}
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default FormButton;
