import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import * as React from "react"

export default function BottomForm() {
  const [age, setAge] = React.useState("")
  const [age2, setAge2] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  const handleChange2 = (event: SelectChangeEvent) => {
    setAge2(event.target.value as string)
  }
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Grid2 container spacing={1}>
        <Grid2 size={4} sx={{ padding: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={4} sx={{ padding: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label2">Age2</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              value={age2}
              label="Age2"
              onChange={handleChange2}
              sx={{ width: "100%" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={4} sx={{ padding: "10px" }}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "70%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            登録
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  )
}
