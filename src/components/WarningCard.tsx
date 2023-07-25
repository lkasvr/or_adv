import Link from "next/link";
import { ReactNode } from "react";

import { AiFillWarning } from 'react-icons/ai';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface IWarningCard {
  title: string;
  children: ReactNode;
  button?: {
    icon?: boolean;
    text: string;
    link: string;
  };
}

function WarningCard({ title, children, button }: IWarningCard) {
  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="flex flex-row flex-nowrap items-center">
        <AiFillWarning className="text-yellow-300 h-8 w-8" />
        <h3
          className="ml-2 text-lg font-medium leading-6 text-gray-900"
        >
          {title}
        </h3>
      </div>

      {children}

      {
        button ?
          (
            <div className="mt-4">
              <Link href={button.link}>
                <button
                  type="button"
                  className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-primary duration-300 hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {button.icon ? <FaArrowLeftLong /> : ''}
                  &nbsp;
                  {button.text}
                </button>
              </Link>
            </div>
          )
          : ''
      }
    </div>
  )
}

export default WarningCard;
