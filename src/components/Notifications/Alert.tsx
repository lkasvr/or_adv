'use client';
import { Alert } from '@/store/domain/Alert';
import { motion } from 'framer-motion';
import React from 'react';
import { BiCheckCircle, BiInfoCircle, BiErrorCircle } from 'react-icons/bi';

interface Props extends Omit<Alert, 'status'> {
  id: string;
  onClose: (id: string) => void;
}

const Notification = ({
  id,
  type,
  title,
  message,
  duration,
  onClose,
}: Props) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      role="alert"
      className={`col-start-3 col-span-2 ${
        type === 'error'
          ? 'rounded border-s-4 border-red-500 bg-red-50 p-4'
          : 'rounded-xl border border-gray-100 bg-white p-4 shadow-xl'
      }`}
    >
      <div className="flex items-start gap-4">
        {type === 'success' && (
          <span className="text-green-600">
            <BiCheckCircle className="h-6 w-6" />
          </span>
        )}
        {type === 'info' && (
          <span className="text-blue-600">
            <BiInfoCircle className="h-6 w-6" />
          </span>
        )}
        {type === 'error' && (
          <span className="text-red-800">
            <BiErrorCircle className="h-6 w-6" />
          </span>
        )}

        <div className="flex-1">
          <strong
            className={`block font-medium ${
              type === 'error' ? 'text-red-800' : 'text-gray-900'
            }`}
          >
            {title}
          </strong>

          <p
            className={`mt-1 text-sm ${
              type === 'error' ? 'text-red-700' : 'text-gray-700'
            }`}
          >
            {message}
          </p>
        </div>

        <button
          onClick={() => onClose(id)}
          className="text-gray-500 transition hover:text-gray-600"
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Notification;
