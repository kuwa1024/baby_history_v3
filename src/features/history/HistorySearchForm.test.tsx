import { render, getByRole, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Mock } from 'vitest';
import { useAppDispatch } from '@/app/hooks';
import { store } from '@/app/store';
import HistorySearchForm from '@/features/history/HistorySearchForm';
import { setSearch } from './api/itemSlice';

vi.mock('@/app/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

describe('HistorySearchForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('検索フォームとFabボタンが表示される', () => {
    render(
      <Provider store={store}>
        <HistorySearchForm />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();
  });

  it('Fabボタンをクリックするとダイアログが開く', async () => {
    render(
      <Provider store={store}>
        <HistorySearchForm />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(screen.getByText('リセット')).toBeInTheDocument();
  });

  it('リセットボタンをクリックするとダイアログが閉じる', async () => {
    const dispatch = vi.fn();
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <HistorySearchForm />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(screen.getByText('リセット')).toBeInTheDocument();
    await userEvent.click(screen.getByText('リセット'));
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setSearch(''));
      expect(document.body).not.toHaveTextContent('リセット');
    });
  });

  it('選択したカテゴリでフォームが送信される', async () => {
    const dispatch = vi.fn();
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
    window.scrollTo = vi.fn();
    render(
      <Provider store={store}>
        <HistorySearchForm />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'add' }));
    await userEvent.click(getByRole(screen.getByTestId('category'), 'combobox'));
    await userEvent.click(screen.getByText('おしっこ'));
    await userEvent.click(screen.getByRole('button', { name: '検索' }));

    expect(dispatch).toHaveBeenCalledWith(setSearch('おしっこ'));
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
