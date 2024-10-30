import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { Control, Controller } from "react-hook-form"

export interface commonSelectProps {
  control: Control<any>
  id: string
  label: string
  items: string[]
  required?: boolean
}

export const CommonSelect = (props: commonSelectProps) => {
  return (
    <Box>
      <Controller
        name={props.id}
        control={props.control}
        defaultValue={""}
        render={({ field, formState: { errors } }) => (
          <FormControl fullWidth error={errors.select ? true : false}>
            <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
            <Select
              labelId={`${props.id}-label`}
              id={props.id}
              label={props.label}
              sx={{ width: "100%" }}
              {...field}
            >
              {props.items.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {(errors.select?.message as string) || ""}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  )
}
