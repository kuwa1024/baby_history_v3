import { Box } from "@mui/material"
import { Control } from "react-hook-form"
import { SelectElement } from "react-hook-form-mui"

export interface SelectProps {
  control: Control<any>
  id: string
  label: string
  items: string[]
  required?: boolean
}

export const Select = (props: SelectProps) => {
  const options = props.items.map((item) => ({ id: item, label: item }))
  if (props.id === "categorySub") {
    console.log(props)
  }
  return (
    <Box>
      <SelectElement
        label={props.label}
        name={props.id}
        control={props.control}
        options={options}
        required={props.required}
        sx={{ width: "100%" }}
      />
    </Box>
  )
}
