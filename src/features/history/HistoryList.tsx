import styled from '@emotion/styled';
import { TableRow, TableContainer, Paper, Table, TableCell, TableBody } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form-mui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setLoading } from '@/components/loading/loadingSlice';
import { showNotification } from '@/components/notification/notificationSlice';
import { setLastItems } from '@/features/history/historyParamSlice';
import { useEditItemMutation, useGetItemsQuery } from '@/features/history/historySlice';
import HistoryTableEditRow from '@/features/history/HistoryTableEditRow';
import HistoryTableRow from '@/features/history/HistoryTableRow';

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
  createDatetime: string;
  category: string;
  categorySub: string;
}

export default function HistoryList() {
  const dispatch = useDispatch();
  const lastItems = useSelector((state: RootState) => state.historyParam.lastItems);
  const search = useSelector((state: RootState) => state.historyParam.search);
  const { data: items = [], isLoading, isError } = useGetItemsQuery({ lastItems, search });
  const [editCell, setEditCell] = useState<string>('');
  const [editItem] = useEditItemMutation();
  const methods = useForm<Inputs>();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      dispatch(
        showNotification({
          message: 'データの取得に失敗しました',
          severity: 'error',
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
        dispatch(setLastItems(items));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await editItem({ ...data, id: editCell });
    dispatch(showNotification({ message: '更新しました', severity: 'success' }));
    setEditCell('');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}>
        <TableContainer component={Paper} sx={{ marginBottom: '100px' }}>
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
}
