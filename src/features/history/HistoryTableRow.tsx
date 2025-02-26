import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, TableCell } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { setLoading } from '@/components/loading/loadingSlice';
import { showNotification } from '@/components/notification/notificationSlice';
import { useDeleteItem } from '@/features/history/api/deleteItem';
import { useEditItem } from '@/features/history/api/editItem';
import { Item } from '@/types/api';
import { formatDate } from '@/utils/format';

interface HistoryTableRowProps {
  item: Item;
  setEditCell: (id: string) => void;
}

export const HistoryTableRow = ({ item, setEditCell }: HistoryTableRowProps) => {
  const dispatch = useAppDispatch();
  const editItem = useEditItem();
  const deleteItem = useDeleteItem();

  useEffect(() => {
    dispatch(setLoading(editItem.isPending || deleteItem.isPending));
  }, [editItem.isPending, deleteItem.isPending]);

  const onAlarm = () => {
    const date1 = item.createDatetime.toDate();
    const date2 = new Date();
    const diff =
      Math.floor(date2.getTime() / (60 * 1000)) - Math.floor(date1.getTime() / (60 * 1000));
    const minutes = Math.floor(Math.abs(diff));
    const newItem = { ...item, categorySub: `${minutes}分` };
    editItem.mutate(newItem);
    dispatch(showNotification({ message: '更新しました', severity: 'success' }));
  };

  const onEdit = () => {
    setEditCell(item.id);
  };

  const onDelete = () => {
    if (!confirm('削除しますか？')) {
      return;
    }
    deleteItem.mutate(item.id);
    dispatch(showNotification({ message: '削除しました', severity: 'success' }));
  };

  return (
    <>
      <TableCell scope="row" sx={{ padding: '0px' }} align="center">
        {formatDate(item.createDatetime)}
      </TableCell>
      <TableCell sx={{ padding: '0px' }} align="center">
        {item.category}{' '}
        {item.category.match(/母乳/) && item.categorySub == '' ? (
          <IconButton onClick={() => void onAlarm()}>
            <AddAlarmIcon fontSize="small" />
          </IconButton>
        ) : (
          item.categorySub
        )}
      </TableCell>
      <TableCell sx={{ padding: '0px' }} align="center">
        <Stack direction="row">
          <IconButton onClick={() => void onEdit()}>
            <EditIcon color="action" />
          </IconButton>
          <IconButton onClick={() => void onDelete()}>
            <DeleteIcon color="action" />
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};
