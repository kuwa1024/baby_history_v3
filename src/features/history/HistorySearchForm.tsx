import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form-mui';
import { useDispatch } from 'react-redux';
import { Select, SelectProps } from '@/components/Select';
import { setSearch } from '@/features/history/historyParamSlice';
import { category } from '@/utils/category';

interface Inputs {
  category: string;
}

export default function HistorySearchForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  const { control, handleSubmit, reset, setValue } = useForm<Inputs>();

  useEffect(() => {
    setValue('category', categoryId);
  }, [categoryId]);

  const categorySelectProps: SelectProps = {
    ...category,
    required: false,
    control: control,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    handleClose();
    reset();
    setCategoryId('');
    dispatch(setSearch(''));
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setCategoryId(data.category);
    dispatch(setSearch(data.category));
    handleClose();
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Fab
        color="primary"
        onClick={handleClickOpen}
        aria-label="add"
        sx={{ position: 'fixed', bottom: 180, right: 16 }}
      >
        <SearchIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
              void handleSubmit(onSubmit)(event),
          },
        }}
      >
        <DialogTitle>検索</DialogTitle>
        <DialogContent>
          <Select {...categorySelectProps} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>リセット</Button>
          <Button type="submit">検索</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
