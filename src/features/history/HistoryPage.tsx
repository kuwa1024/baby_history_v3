import ScrollTop from '@/components/ScrollTop';
import HistoryAddForm from '@/features/history/HistoryAddForm';
import HistoryList from '@/features/history/HistoryList';
import HistorySearchForm from '@/features/history/HistorySearchForm';

export const HistoryPage = () => {
  return (
    <div>
      <HistoryList />
      <HistorySearchForm />
      <ScrollTop />
      <HistoryAddForm />
    </div>
  );
};
