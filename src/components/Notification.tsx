import { Alert } from "@mui/material"
import Snackbar from "@mui/material/Snackbar"
import { useEffect, useState } from "react"

export interface NotificationProps {
  message: string
  severity?: "success" | "error" | "warning" | "info"
}

export default function Notification({
  message,
  severity = "success",
}: NotificationProps) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (message) {
      setOpen(true)
    }
  }, [message])

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
