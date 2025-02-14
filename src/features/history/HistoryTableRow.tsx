import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, TableCell } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationProps } from '@/components/Notification';
import { resetLastItems } from '@/features/history/historyParamSlice';
import { Item, useDeleteItemMutation, useEditItemMutation } from '@/features/history/historySlice';
import { formatDate } from '@/utils/format';

interface HistoryTableRowProps {
  item: Item;
  setEditCell: (id: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setNotification: (notification: NotificationProps) => void;
}

export default function HistoryTableRow({
  item,
  setEditCell,
  setIsLoading,
  setNotification,
}: HistoryTableRowProps) {
  const dispatch = useDispatch();
  const [editItem, { isLoading: isLoadingEdit }] = useEditItemMutation();
  const [deleteItem, { isLoading: isLoadingDelete }] = useDeleteItemMutation();

  useEffect(() => {
    setIsLoading(isLoadingEdit || isLoadingDelete);
  }, [isLoadingEdit, isLoadingDelete]);

  const onAlarm = async () => {
    try {
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

  const onEdit = () => {
    setEditCell(item.id);
  };

  const onDelete = async () => {
    if (!confirm('削除しますか？')) {
      return;
    }
    try {
      await deleteItem(item.id);
      dispatch(resetLastItems());
      setNotification({ message: '削除しました', severity: 'success' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setNotification({ message: '削除に失敗しました', severity: 'error' });
    }
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
}
