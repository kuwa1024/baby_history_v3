import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid2, Button, TableCell } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form-mui';
import { Select, SelectProps } from '@/components/Select';
import { category } from '@/consts/category';
import { categorySub } from '@/consts/categorySub';
import { Inputs } from '@/features/history/HistoryList';
import { Item } from '@/features/history/historySlice';

interface HistoryTableEditRowProps {
  item: Item;
  setEditCell: (id: string) => void;
  form: UseFormReturn<Inputs>;
}

export default function HistoryTableEditRow({ item, setEditCell, form }: HistoryTableEditRowProps) {
  const categorySelectProps: SelectProps = {
    ...category,
    control: form.control,
  };

  const categoryValue = form.watch('category');
  const index = categoryValue
    ? category.relations[category.items.findIndex((item) => item === categoryValue)]
    : 0;
  const categorySubSelect = categorySub[index];

  const [categorySubSelectProps, setCategorySubSelectProps] = useState<SelectProps>({
    ...categorySubSelect,
    sx: { width: '90%', marginLeft: '10%' },
    control: form.control,
  });

  useEffect(() => {
    form.setValue('categorySub', '');
    form.unregister('categorySub');
    form.register('categorySub');
    if (categorySubSelect.items.some((value) => value === item.categorySub)) {
      form.setValue('categorySub', item.categorySub);
    }
    setCategorySubSelectProps({
      ...categorySubSelect,
      sx: { width: '90%', marginLeft: '10%' },
      control: form.control,
    });
  }, [categoryValue]);

  useEffect(() => {
    form.setValue('category', item.category);
    form.setValue('createDatetime', item.createDatetime);
  }, []);

  const onClear = () => {
    setEditCell('');
  };

  return (
    <>
      <TableCell scope="row">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="createDatetime"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="createDatetime"
                format="MM/DD HH:mm"
                value={dayjs(field.value)}
                inputRef={field.ref}
                onChange={(date) => {
                  field.onChange(date?.format());
                }}
                ampm={false}
              />
            )}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell>
        <Grid2 container>
          <Grid2 size={6}>
            <Select {...categorySelectProps} />
          </Grid2>
          <Grid2 size={6}>
            <Select {...categorySubSelectProps} />
          </Grid2>
        </Grid2>
      </TableCell>
      <TableCell align="center">
        <Grid2 container sx={{ marginLeft: '20%', marginRight: '20%' }}>
          <Grid2 size={6}>
            <Button type="submit">
              <CheckIcon color="action" />
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button onClick={() => void onClear()}>
              <ClearIcon color="action" />
            </Button>
          </Grid2>
        </Grid2>
      </TableCell>
    </>
  );
}
