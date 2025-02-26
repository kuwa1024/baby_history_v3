import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollTop } from '@/components/ScrollTop';
import { HistoryAddForm } from '@/features/history/HistoryAddForm';
import { HistoryList } from '@/features/history/HistoryList';
import { HistorySearchForm } from '@/features/history/HistorySearchForm';

const queryClient = new QueryClient();

export const HistoryPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryList />
      <HistorySearchForm />
      <ScrollTop />
      <HistoryAddForm />
    </QueryClientProvider>
  );
};
