import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ open = false }) {
  return (
    <div>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
