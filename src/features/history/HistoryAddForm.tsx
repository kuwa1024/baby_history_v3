import { Button, Grid2, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form-mui';
import { useAppDispatch } from '@/app/hooks';
import { setLoading } from '@/components/loading/loadingSlice';
import { showNotification } from '@/components/notification/notificationSlice';
import { Select, SelectProps } from '@/components/Select';
import { useCreateItem } from '@/features/history/api/createItem';
import { category } from '@/utils/category';
import { categorySub } from '@/utils/categorySub';

interface Inputs {
  category: string;
  categorySub: string;
}

export default function HistoryAddForm() {
  const dispatch = useAppDispatch();
  const createItem = useCreateItem();
  const { control, watch, handleSubmit, reset, register, unregister, setValue } = useForm<Inputs>();
  const [categorySubSelectProps, setCategorySubSelectProps] = useState<SelectProps>({
    ...categorySub[0],
    control: control,
  });

  useEffect(() => {
    dispatch(setLoading(createItem.isPending));
  }, [createItem.isPending]);

  const categorySelectProps: SelectProps = {
    ...category,
    control: control,
  };

  const categoryValue = watch('category');
  const index = categoryValue
    ? category.relations[category.items.findIndex((item) => item === categoryValue)]
    : 0;
  const categorySubSelect = categorySub[index];

  useEffect(() => {
    unregister('categorySub');
    setValue('categorySub', '');
    setCategorySubSelectProps({ ...categorySubSelect, control: control });
    register('categorySub');
  }, [categoryValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      createItem.mutate({
        category: data.category,
        categorySub: data.categorySub ?? '',
      });
      reset();
      dispatch(showNotification({ message: '登録しました', severity: 'success' }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      dispatch(showNotification({ message: '登録に失敗しました', severity: 'error' }));
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={3}>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Grid2 container spacing={1}>
          <Grid2 size={4} sx={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <Select {...categorySelectProps} />
          </Grid2>
          <Grid2 size={4} sx={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <Select {...categorySubSelectProps} />
          </Grid2>
          <Grid2 size={4} sx={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '100%',
                height: '100%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              登録
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
}
