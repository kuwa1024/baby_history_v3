import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';

export default function FabSearch() {
  return (
    <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 180, right: 16 }}>
      <SearchIcon />
    </Fab>
  );
}
