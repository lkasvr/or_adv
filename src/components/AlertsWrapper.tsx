'use client';
import { IRootState } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { BiCheckCircle, BiInfoCircle, BiErrorCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';

export default function AlertsWrapper() {
  const { alerts } = useSelector((state: IRootState) => state.alert);
  const [alert, setAlert] = React.useState({
    type: '',
    title: '',
    message: '',
  });
  const [show, setShow] = React.useState(false);

  const onClose = () => {
    setShow(false);
  };

  React.useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [alerts]);

  return (
    <div className="absolute z-50 top-2 w-full pl-[25%] flex flex-row flex-nowrap justify-center">
      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="alert"
            className={
              alert.type === 'error'
                ? 'rounded border-s-4 border-red-500 bg-red-50 p-4'
                : 'rounded-xl border border-gray-100 bg-white p-4 shadow-xl'
            }
          >
            <div className="flex items-start gap-4">
              {alert.type === 'success' ? (
                <span className="text-green-600">
                  <BiCheckCircle className="h-6 w-6" />
                </span>
              ) : null}
              {alert.type === 'info' ? (
                <span className="text-blue-600">
                  <BiInfoCircle className="h-6 w-6" />
                </span>
              ) : null}
              {alert.type === 'error' ? (
                <span className="text-red-800">
                  <BiErrorCircle className="h-6 w-6" />
                </span>
              ) : null}

              <div className="flex-1">
                <strong
                  className={`block font-medium ${
                    alert.type === 'error' ? 'text-red-800' : 'text-gray-900'
                  }`}
                >
                  {alert.title}
                </strong>

                <p
                  className={`mt-1 text-sm ${
                    alert.type === 'error' ? 'text-red-700' : 'text-gray-700'
                  }`}
                >
                  {alert.message}
                </p>
              </div>

              <button
                onClick={onClose}
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}
