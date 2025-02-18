import { Snackbar, Alert, AlertColor } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { hideNotification } from './notificationSlice';

export default function Notification() {
  const dispatch = useAppDispatch();
  const { message, severity, open } = useAppSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity as AlertColor}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
