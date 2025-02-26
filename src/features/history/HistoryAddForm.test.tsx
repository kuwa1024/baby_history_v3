import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { render, screen, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Mock } from 'vitest';
import { store } from '@/app/store';
import { Notification } from '@/components/notification/Notification';
import { HistoryAddForm } from '@/features/history/HistoryAddForm';

const queryClient = new QueryClient();

describe('HistoryAddForm', () => {
  beforeAll(() => {
    window.scrollTo = vi.fn();
  });

  it('カテゴリーとサブカテゴリーのセレクトボックスを持つフォームが表示される', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HistoryAddForm />
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByTestId('category')).toHaveTextContent('カテゴリー');
    expect(screen.getByTestId('categorySub')).toHaveTextContent('サブカテゴリー');
  });

  it('カテゴリーの変更に応じてサブカテゴリーのセレクトボックスのオプションが更新される', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HistoryAddForm />
        </QueryClientProvider>
      </Provider>
    );
    await userEvent.click(getByRole(screen.getByTestId('category'), 'combobox'));
    await userEvent.click(screen.getByText('ミルク'));
    await userEvent.click(getByRole(screen.getByTestId('categorySub'), 'combobox'));
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});

describe('HistoryAddForm with mock', () => {
  beforeEach(() => {
    vi.mock('@tanstack/react-query', async () => {
      const actual = await vi.importActual('@tanstack/react-query');
      return {
        ...actual,
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      };
    });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('有効なデータでフォームが送信される(ミルク)', async () => {
    const mockMutate = vi.fn();
    (useMutation as Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Notification />
          <HistoryAddForm />
        </QueryClientProvider>
      </Provider>
    );
    await userEvent.click(getByRole(screen.getByTestId('category'), 'combobox'));
    await userEvent.click(screen.getByText('ミルク'));
    await userEvent.click(getByRole(screen.getByTestId('categorySub'), 'combobox'));
    await userEvent.click(screen.getByText('100'));

    await userEvent.click(screen.getByText('登録'));
    expect(mockMutate).toHaveBeenCalled();
    expect(screen.getByText('登録しました')).toBeInTheDocument();
    expect(screen.getByTestId('category')).not.toHaveTextContent('ミルク');
    expect(screen.getByTestId('category')).not.toHaveTextContent('100');
  });

  it('有効なデータでフォームが送信される(おしっこ)', async () => {
    const mockMutate = vi.fn();
    (useMutation as Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Notification />
          <HistoryAddForm />
        </QueryClientProvider>
      </Provider>
    );
    await userEvent.click(getByRole(screen.getByTestId('category'), 'combobox'));
    await userEvent.click(screen.getByText('おしっこ'));

    await userEvent.click(screen.getByText('登録'));
    expect(mockMutate).toHaveBeenCalled();
    expect(screen.getByText('登録しました')).toBeInTheDocument();
    expect(screen.getByTestId('category')).not.toHaveTextContent('おしっこ');
  });
});
