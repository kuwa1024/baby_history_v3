import { useState } from 'react';
import Loading from '@/components/Loading';
import Notification, { NotificationProps } from '@/components/Notification';
import ScrollTop from '@/components/ScrollTop';
import HistoryAddForm from '@/features/history/HistoryAddForm';
import HistoryList from '@/features/history/HistoryList';
import HistorySearchForm from '@/features/history/HistorySearchForm';

export const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    severity: 'success',
  } as NotificationProps);

  return (
    <div>
      <Loading open={isLoading} />
      <Notification message={notification.message} severity={notification.severity} />
      <HistoryList setIsLoading={setIsLoading} setNotification={setNotification} />
      <HistorySearchForm />
      <ScrollTop />
      <HistoryAddForm setIsLoading={setIsLoading} setNotification={setNotification} />
    </div>
  );
};
