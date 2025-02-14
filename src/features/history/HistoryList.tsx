import styled from '@emotion/styled';
import { TableRow, TableContainer, Paper, Table, TableCell, TableBody } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { NotificationProps } from '@/components/Notification';
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

interface HistoryListProps {
  setIsLoading: (isLoading: boolean) => void;
  setNotification: (notification: NotificationProps) => void;
}

export default function HistoryList({ setIsLoading, setNotification }: HistoryListProps) {
  const dispatch = useDispatch();
  const lastItems = useSelector((state: RootState) => state.historyParam.lastItems);
  const search = useSelector((state: RootState) => state.historyParam.search);
  const { data: items = [], isLoading, isError } = useGetItemsQuery({ lastItems, search });
  const [editCell, setEditCell] = useState<string>('');
  const [editItem] = useEditItemMutation();
  const form = useForm<Inputs>();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setNotification({
        message: 'データの取得に失敗しました',
        severity: 'error',
      });
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
    setNotification({ message: '更新しました', severity: 'success' });
    setEditCell('');
  };

  return (
    <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
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
                  <HistoryTableEditRow item={item} setEditCell={setEditCell} form={form} />
                ) : (
                  <HistoryTableRow
                    item={item}
                    setEditCell={setEditCell}
                    setIsLoading={setIsLoading}
                    setNotification={setNotification}
                  />
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
