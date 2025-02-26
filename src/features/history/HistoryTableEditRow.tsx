import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { TableCell, Stack, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form-mui';
import { Select, SelectProps } from '@/components/Select';
import { Inputs } from '@/features/history/HistoryList';
import { Item } from '@/types/api';
import { category } from '@/utils/category';
import { categorySub } from '@/utils/categorySub';

interface HistoryTableEditRowProps {
  item: Item;
  setEditCell: (id: string) => void;
}

export const HistoryTableEditRow = ({ item, setEditCell }: HistoryTableEditRowProps) => {
  const { control, watch, setValue, unregister, register } = useFormContext<Inputs>();
  const categorySelectProps: SelectProps = {
    ...category,
    control: control,
  };

  const categoryValue = watch('category');
  const index = categoryValue
    ? category.relations[category.items.findIndex((item) => item === categoryValue)]
    : 0;
  const categorySubSelect = categorySub[index];

  const [categorySubSelectProps, setCategorySubSelectProps] = useState<SelectProps>({
    ...categorySubSelect,
    control: control,
  });

  useEffect(() => {
    unregister('categorySub');
    register('categorySub');
    setValue('categorySub', '');
    if (categorySubSelect.items.some((value) => value === item.categorySub)) {
      setValue('categorySub', item.categorySub);
    }
    setCategorySubSelectProps({
      ...categorySubSelect,
      control: control,
    });
  }, [categoryValue]);

  useEffect(() => {
    setValue('category', item.category);
    setValue('createDatetime', item.createDatetime.toDate().toLocaleString());
  }, []);

  const onClear = () => {
    setEditCell('');
  };

  return (
    <>
      <TableCell scope="row" sx={{ padding: '0px' }} align="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="createDatetime"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="日時"
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
      <TableCell sx={{ padding: '0px' }} align="center">
        <Stack direction="row">
          <Select {...categorySelectProps} />
          <Select {...categorySubSelectProps} />
        </Stack>
      </TableCell>
      <TableCell sx={{ padding: '0px' }} align="center">
        <Stack direction="row">
          <IconButton type="submit">
            <CheckIcon color="action" />
          </IconButton>
          <IconButton onClick={() => void onClear()}>
            <ClearIcon color="action" />
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};
