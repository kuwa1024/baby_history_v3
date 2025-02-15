import { Snackbar, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { hideNotification } from './notificationSlice';

export default function Notification() {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector((state: RootState) => state.notification);

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
