import { useState } from 'react';
import Loading from '@/components/Loading';
import ScrollTop from '@/components/ScrollTop';
import HistoryAddForm from '@/features/history/HistoryAddForm';
import HistoryList from '@/features/history/HistoryList';
import HistorySearchForm from '@/features/history/HistorySearchForm';

export const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Loading open={isLoading} />
      <HistoryList setIsLoading={setIsLoading} />
      <HistorySearchForm />
      <ScrollTop />
      <HistoryAddForm setIsLoading={setIsLoading} />
    </div>
  );
};
