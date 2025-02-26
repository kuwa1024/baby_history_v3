import { fireEvent, render, screen } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import { Mock } from 'vitest';
import { HistoryTableRow } from '@/features/history/HistoryTableRow';
import { Item } from '@/types/api';
import { useDeleteItem } from './api/deleteItem';
import { useEditItem } from './api/editItem';

vi.mock('@/app/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('@/features/history/api/editItem', () => ({
  useEditItem: vi.fn(() => ({ mutate: vi.fn() })),
}));

vi.mock('@/features/history/api/deleteItem', () => ({
  useDeleteItem: vi.fn(() => ({ mutate: vi.fn() })),
}));

vi.mock('@/components/loading/loadingSlice', () => ({
  setLoading: vi.fn(),
}));

vi.mock('@/components/notification/notificationSlice', () => ({
  showNotification: vi.fn(),
}));

describe('HistoryTableRow', () => {
  const item: Item = {
    id: '1',
    createDatetime: Timestamp.fromDate(new Date('2022-01-01 12:34:56')),
    category: '母乳',
    categorySub: '10分',
  };

  const setEditCell = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('テーブルセルが正しいデータでレンダリングされる', () => {
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    expect(screen.getByText('01/01 12:34')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item.category))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item.categorySub))).toBeInTheDocument();
    expect(screen.getByTestId('EditIcon')).toBeInTheDocument();
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
  });

  it('アラームアイコンが正しいデータでレンダリングされる', () => {
    item.categorySub = '';
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    expect(screen.getByText('01/01 12:34')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item.category))).toBeInTheDocument();
    expect(screen.getByTestId('AddAlarmIcon')).toBeInTheDocument();
    expect(screen.getByTestId('EditIcon')).toBeInTheDocument();
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
  });

  it('アラームアイコンがクリックされたときに onAlarm 関数が呼ばれる', () => {
    const mutateMock = vi.fn();
    (useEditItem as Mock).mockReturnValue({
      mutate: mutateMock,
    });
    item.categorySub = '';
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    fireEvent.click(screen.getByTestId('AddAlarmIcon'));

    expect(mutateMock).toHaveBeenCalledTimes(1);
  });

  it('編集アイコンがクリックされたときに onEdit 関数が呼ばれる', () => {
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    fireEvent.click(screen.getByTestId('EditIcon'));

    expect(setEditCell).toHaveBeenCalledTimes(1);
  });

  it('削除アイコンがクリックされたときに onDelete 関数が呼ばれる', () => {
    const mutateMock = vi.fn();
    (useDeleteItem as Mock).mockReturnValue({
      mutate: mutateMock,
    });
    window.confirm = vi.fn(() => true);
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    fireEvent.click(screen.getByTestId('DeleteIcon'));

    expect(window.confirm).toBeCalled();
    expect(mutateMock).toHaveBeenCalledTimes(1);
  });

  it('削除アイコンがクリックされたときにconfirmがfalseなら onDelete 関数が呼ばれない', () => {
    const mutateMock = vi.fn();
    (useDeleteItem as Mock).mockReturnValue({
      mutate: mutateMock,
    });
    window.confirm = vi.fn(() => false);
    render(<HistoryTableRow item={item} setEditCell={setEditCell} />);

    fireEvent.click(screen.getByTestId('DeleteIcon'));

    expect(window.confirm).toBeCalled();
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
