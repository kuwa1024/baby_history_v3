import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

export const ScrollTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab
      color="inherit"
      aria-label="up"
      sx={{ position: 'fixed', bottom: 110, right: 16 }}
      onClick={handleClick}
      data-testid="scrollTop"
    >
      <UpIcon />
    </Fab>
  );
};
