import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';
import { getNotifications } from '../../store/notification/selectors';
import { INotification } from '../../types/notification';
import { ToastOptions } from 'react-toastify/dist/types';
import { clearNotification } from '../../store/notification/notification';
import 'react-toastify/dist/ReactToastify.css';

const Notification: React.FC = () => {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: INotification) => {
      const toastOptions: ToastOptions = {
        autoClose: notification.duration || 3000,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warning(notification.message, toastOptions);
          break;
      }
    });
  };

  return <>{renderNotification()}</>;
};

export default Notification;
