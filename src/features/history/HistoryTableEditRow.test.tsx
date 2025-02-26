import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timestamp } from 'firebase/firestore';
import { FormProvider, useForm } from 'react-hook-form-mui';
import { vi } from 'vitest';
import { HistoryTableEditRow } from '@/features/history/HistoryTableEditRow';
import { Inputs } from './HistoryList';

const mockItem = {
  id: '1',
  category: '母乳',
  categorySub: '10分',
  createDatetime: Timestamp.fromDate(new Date('2025-02-24 12:34:56')),
};

const mockSetEditCell = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<Inputs>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('HistoryTableEditRow', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(
      <Wrapper>
        <HistoryTableEditRow item={mockItem} setEditCell={mockSetEditCell} />
      </Wrapper>
    );
    expect(screen.getByDisplayValue('02/24 12:34')).toBeInTheDocument();
    expect(getByRole(screen.getByTestId('category'), 'combobox')).toHaveTextContent('母乳');
    expect(getByRole(screen.getByTestId('categorySub'), 'combobox')).toHaveTextContent('10分');
  });

  it('日付が変更できる', async () => {
    render(
      <Wrapper>
        <HistoryTableEditRow item={mockItem} setEditCell={mockSetEditCell} />
      </Wrapper>
    );
    await userEvent.click(screen.getByTestId('CalendarIcon'));
    await userEvent.click(screen.getByRole('gridcell', { name: '12' }));
    await userEvent.click(screen.getByRole('option', { name: '2 hours' }));
    await userEvent.click(screen.getByRole('option', { name: '35 minutes' }));
    expect(screen.getByDisplayValue('02/12 02:35')).toBeInTheDocument();
  });

  it('カテゴリーの変更に応じてサブカテゴリーのセレクトボックスのオプションが更新される', async () => {
    render(
      <Wrapper>
        <HistoryTableEditRow item={mockItem} setEditCell={mockSetEditCell} />
      </Wrapper>
    );
    await userEvent.click(getByRole(screen.getByTestId('category'), 'combobox'));
    await userEvent.click(screen.getByText('ミルク'));
    await userEvent.click(getByRole(screen.getByTestId('categorySub'), 'combobox'));
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('クリアボタンが機能する', async () => {
    render(
      <Wrapper>
        <HistoryTableEditRow item={mockItem} setEditCell={mockSetEditCell} />
      </Wrapper>
    );
    await userEvent.click(screen.getByTestId('ClearIcon'));
    expect(mockSetEditCell).toHaveBeenCalledTimes(1);
  });
});
