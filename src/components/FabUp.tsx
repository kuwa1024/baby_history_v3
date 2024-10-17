import UpIcon from "@mui/icons-material/KeyboardArrowUp"
import Fab from "@mui/material/Fab"

export default function FabUp() {
  return (
    <Fab
      color="inherit"
      aria-label="up"
      sx={{ position: "fixed", bottom: 110, right: 16 }}
    >
      <UpIcon />
    </Fab>
  )
}
