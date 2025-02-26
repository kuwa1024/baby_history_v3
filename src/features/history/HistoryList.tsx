import styled from '@emotion/styled';
import { TableRow, TableContainer, Paper, Table, TableCell, TableBody } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form-mui';
import { useAppDispatch } from '@/app/hooks';
import { setLoading } from '@/components/loading/loadingSlice';
import { showNotification } from '@/components/notification/notificationSlice';
import { useEditItem } from '@/features/history/api/editItem';
import { useInfiniteItems } from '@/features/history/api/getItems';
import { HistoryTableEditRow } from '@/features/history/HistoryTableEditRow';
import { HistoryTableRow } from '@/features/history/HistoryTableRow';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'whitesmoke',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface Inputs {
  category: string;
  categorySub: string;
  createDatetime: string;
}

export const HistoryList = () => {
  const dispatch = useAppDispatch();
  const itemsQuery = useInfiniteItems();

  const [editCell, setEditCell] = useState<string>('');
  const editItem = useEditItem();
  const methods = useForm<Inputs>();

  useEffect(() => {
    dispatch(setLoading(itemsQuery.isPending));
  }, [itemsQuery.isPending]);

  useEffect(() => {
    if (itemsQuery.isError) {
      dispatch(showNotification({ message: 'データの取得に失敗しました', severity: 'error' }));
    }
  }, [itemsQuery.isError]);

  const items = itemsQuery.data?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
        itemsQuery.fetchNextPage().catch(() => {
          dispatch(showNotification({ message: 'データの取得に失敗しました', severity: 'error' }));
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    editItem.mutate({
      id: editCell,
      category: data.category,
      categorySub: data.categorySub ?? '',
      createDatetime: Timestamp.fromDate(new Date(data.createDatetime)),
    });
    dispatch(showNotification({ message: '更新しました', severity: 'success' }));
    setEditCell('');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
        data-testid="historyForm"
      >
        <TableContainer component={Paper} sx={{ marginBottom: '100px' }} data-testid="historyList">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '45%' }} align="center">
                  日時
                </TableCell>
                <TableCell sx={{ width: '45%' }} align="center">
                  行動
                </TableCell>
                <TableCell sx={{ width: '10%' }} align="center">
                  操作
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <StyledTableRow key={item.id}>
                  {editCell === item.id ? (
                    <HistoryTableEditRow item={item} setEditCell={setEditCell} />
                  ) : (
                    <HistoryTableRow item={item} setEditCell={setEditCell} />
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </FormProvider>
  );
};
