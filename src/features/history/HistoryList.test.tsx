import { TableCell } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import { Mock } from 'vitest';
import { useAppDispatch } from '@/app/hooks';
import { setLoading } from '@/components/loading/loadingSlice';
import { showNotification } from '@/components/notification/notificationSlice';
import { useInfiniteItems } from '@/features/history/api/getItems';
import { HistoryList } from '@/features/history/HistoryList';
import { Item } from '@/types/api';

vi.mock('@/app/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
  useAppSelector: vi.fn(() => vi.fn()),
}));

vi.mock('@/features/history/api/getItems', () => ({
  useInfiniteItems: vi.fn(() => ({
    data: {
      pages: [
        {
          id: 'abc',
          category: 'ミルク',
          categorySub: '100',
          createDatetime: Timestamp.fromDate(new Date('2025-02-25 12:34:56')),
        },
        {
          id: 'def',
          category: 'おしっこ',
          categorySub: '',
          createDatetime: Timestamp.fromDate(new Date('2025-02-24 12:34:56')),
        },
      ] as Item[],
    },
    isPending: false,
    isError: false,
    fetchNextPage: vi.fn(),
  })),
}));

vi.mock('@/features/history/api/editItem', () => ({
  useEditItem: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

vi.mock('@/features/history/HistoryTableEditRow', () => ({
  HistoryTableEditRow: ({ item }: { item: Item }) => (
    <>
      <TableCell>HistoryTableEditRow</TableCell>
      <TableCell>{item.id}</TableCell>
    </>
  ),
}));

vi.mock('@/features/history/HistoryTableRow', () => ({
  HistoryTableRow: ({ item }: { item: Item }) => (
    <>
      <TableCell>HistoryTableRow</TableCell>
      <TableCell>{item.id}</TableCell>
    </>
  ),
}));

vi.mock(import('react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useState: () => ['abc', vi.fn()],
  };
});

describe('HistoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('テーブルが正しい列でレンダリングされる', () => {
    render(<HistoryList />);
    expect(screen.getByText('日時')).toBeInTheDocument();
    expect(screen.getByText('行動')).toBeInTheDocument();
    expect(screen.getByText('操作')).toBeInTheDocument();
    expect(screen.getByText('abc')).toBeInTheDocument();
    expect(screen.getByText('def')).toBeInTheDocument();
  });

  it('itemsQuery.isErrorがtrueの場合、エラーノティフィケーションが表示される', () => {
    (useInfiniteItems as Mock).mockImplementationOnce(() => ({
      data: null,
      isPending: false,
      isError: true,
      fetchNextPage: vi.fn(),
    }));
    const dispatch = vi.fn();
    (useAppDispatch as unknown as Mock).mockImplementationOnce(() => dispatch);

    render(<HistoryList />);

    expect(dispatch).toHaveBeenCalledWith(
      showNotification({ message: 'データの取得に失敗しました', severity: 'error' })
    );
  });

  it('itemsQuery.isPendingが変更されたときにsetLoadingがdispatchされる', () => {
    const dispatch = vi.fn();
    (useAppDispatch as unknown as Mock).mockImplementationOnce(() => dispatch);
    (useInfiniteItems as Mock).mockImplementationOnce(() => ({
      data: null,
      isPending: true,
      isError: false,
      fetchNextPage: vi.fn(),
    }));
    render(<HistoryList />);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('スクロールイベントが発生したときに次のページがフェッチされる', () => {
    const fetchNextPage = vi.fn().mockResolvedValue(undefined);
    (useInfiniteItems as Mock).mockImplementationOnce(() => ({
      data: {
        pages: [[{ id: '1', category: 'test' }]],
      },
      isPending: false,
      isError: false,
      fetchNextPage,
    }));
    render(<HistoryList />);

    fireEvent.scroll(window, { target: { scrollTop: 10 } });
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('フォームが正しいデータでサブミットされる', () => {
    const dispatch = vi.fn();
    (useAppDispatch as unknown as Mock).mockImplementation(() => dispatch);
    render(<HistoryList />);

    const form = screen.getByTestId('historyForm');
    fireEvent.submit(form, {
      target: {
        id: 'def',
        category: 'おしっこ',
        categorySub: '',
        createDatetime: Timestamp.fromDate(new Date('2025-02-24 12:34:56')),
      },
    });
    expect(dispatch).toHaveBeenCalled();
  });

  it('editCellがアイテムIDと一致するときに編集行がレンダリングされる', () => {
    render(<HistoryList />);

    expect(screen.getByText('HistoryTableEditRow')).toBeInTheDocument();
  });
});
