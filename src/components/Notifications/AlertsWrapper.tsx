'use client';
import { IRootState } from '@/store';
import { setDisplayedAlert } from '@/store/appSlice';
import { Alert } from '@/store/domain/Alert';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from './Alert';

const AlertsWrapper = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state: IRootState) => state.app);

  const [alertsToShow, setAlertsToShow] = React.useState<Alert[]>([]);

  React.useEffect(() => {
    if (alerts.length > 0) alerts.forEach((alert) => addAlert(alert));
  }, [alerts]);

  const addAlert = (alert: Alert) => {
    if (alert.status === 'displayed') return;

    setAlertsToShow((prevAlerts) => [
      ...prevAlerts.filter((prevAlert) => prevAlert.status === 'display'),
      alert,
    ]);
    dispatch(setDisplayedAlert(alert.id));
  };

  const removeAlert = (id: string) =>
    setAlertsToShow((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id),
    );

  return (
    <div className="absolute z-50 top-2 gap-2 w-full pl-[25%] grid grid-cols-6">
      <AnimatePresence>
        {alertsToShow.map(({ id, type, title, message, duration }) => (
          <Notification
            key={id}
            id={id}
            type={type}
            title={title}
            message={message}
            duration={duration}
            onClose={removeAlert}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertsWrapper;
