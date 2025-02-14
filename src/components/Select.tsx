import { Box, SxProps, Theme } from '@mui/material';
import { Control, SelectElement } from 'react-hook-form-mui';

/* eslint @typescript-eslint/no-explicit-any: 0 */
export interface SelectProps {
  control: Control<any>;
  id: string;
  label: string;
  items: string[];
  required?: boolean;
  sx?: SxProps<Theme>;
}

export const Select = (props: SelectProps) => {
  const options = props.items.map((item) => ({ id: item, label: item }));
  return (
    <Box>
      <SelectElement
        label={props.label}
        name={props.id}
        control={props.control}
        options={options}
        required={props.required}
        sx={props.sx ?? { width: '100%' }}
      />
    </Box>
  );
};
