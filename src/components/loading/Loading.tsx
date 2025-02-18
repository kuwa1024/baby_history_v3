import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '@/app/hooks';

export default function Loading() {
  const open = useAppSelector((state) => state.loading.open);
  return (
    <div>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
