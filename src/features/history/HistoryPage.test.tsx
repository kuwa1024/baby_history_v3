// src/features/history/HistoryPage.test.tsx
import { render, screen } from '@testing-library/react';
import { HistoryPage } from '@/features/history/HistoryPage';

vi.mock('@/app/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
  useAppSelector: vi.fn(() => vi.fn()),
}));

describe('HistoryPage', () => {
  it('HistoryList、HistorySearchForm、ScrollTop、HistoryAddForm コンポーネントがレンダリングされる', () => {
    render(<HistoryPage />);
    expect(screen.getByTestId('historyList')).toBeInTheDocument();
    expect(screen.getByTestId('historySearchForm')).toBeInTheDocument();
    expect(screen.getByTestId('scrollTop')).toBeInTheDocument();
    expect(screen.getByTestId('historyAddForm')).toBeInTheDocument();
  });
});
