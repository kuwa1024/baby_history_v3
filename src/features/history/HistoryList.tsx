import styled from '@emotion/styled';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid2, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { NotificationProps } from '@/components/Notification';
import { resetLastItems, setLastItems } from '@/features/history/historyParamSlice';
import {
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from '@/features/history/historySlice';
import { formatDate } from '@/utils/format';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'whitesmoke',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface HistoryListProps {
  setIsLoading: (isLoading: boolean) => void;
  setNotification: (notification: NotificationProps) => void;
}

export default function HistoryList({ setIsLoading, setNotification }: HistoryListProps) {
  const dispatch = useDispatch();
  const lastItems = useSelector((state: RootState) => state.historyParam.lastItems);
  const search = useSelector((state: RootState) => state.historyParam.search);
  const { data: items = [], isLoading, isError } = useGetItemsQuery({ lastItems, search });
  const [editItem, { isLoading: isLoadingEdit }] = useEditItemMutation();
  const [deleteItem, { isLoading: isLoadingDelete }] = useDeleteItemMutation();

  useEffect(() => {
    setIsLoading(isLoading || isLoadingEdit || isLoadingDelete);
  }, [isLoading, isLoadingEdit, isLoadingDelete]);

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

  const onAlarm = async (id: string) => {
    try {
      const item = items.find((item) => item.id === id);
      if (!item) {
        return;
      }
      const date1 = new Date(item.createDatetime);
      const date2 = new Date();
      const diff =
        Math.floor(date2.getTime() / (60 * 1000)) - Math.floor(date1.getTime() / (60 * 1000));
      const minutes = Math.floor(Math.abs(diff));
      const newItem = { ...item, categorySub: `${minutes}分` };
      await editItem(newItem);
      dispatch(resetLastItems());
      setNotification({ message: '更新しました', severity: 'success' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setNotification({ message: '更新に失敗しました', severity: 'error' });
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('削除しますか？')) {
      return;
    }
    try {
      await deleteItem(id);
      dispatch(resetLastItems());
      setNotification({ message: '削除しました', severity: 'success' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setNotification({ message: '削除に失敗しました', severity: 'error' });
    }
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '100px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>日時</TableCell>
            <TableCell>行動</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow key={item.id}>
              <TableCell scope="row">{formatDate(item.createDatetime)}</TableCell>
              <TableCell>
                {item.category}{' '}
                {item.category.match(/母乳/) && item.categorySub == '' ? (
                  <IconButton onClick={() => void onAlarm(item.id)}>
                    <AddAlarmIcon fontSize="small" />
                  </IconButton>
                ) : (
                  item.categorySub
                )}
              </TableCell>
              <TableCell align="center">
                <Grid2 container sx={{ marginLeft: '20%', marginRight: '20%' }}>
                  <Grid2 size={6}>
                    <Button>
                      <EditIcon color="action" />
                    </Button>
                  </Grid2>
                  <Grid2 size={6}>
                    <Button onClick={() => void onDelete(item.id)}>
                      <DeleteIcon color="action" />
                    </Button>
                  </Grid2>
                </Grid2>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
