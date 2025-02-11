import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error('Sign out error: ', error);
      });
  };

  return (
    <Button variant="contained" onClick={handleSignOut}>
      ログアウト
    </Button>
  );
};
