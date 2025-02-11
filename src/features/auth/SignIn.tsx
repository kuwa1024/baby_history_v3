import { Button } from '@mui/material';
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/app/firebase';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/features/auth/authSlice';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithRedirect(auth, new GoogleAuthProvider()).catch((error) => {
      console.error('Error during sign-in with redirect:', error);
    });
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          const user = result.user;
          dispatch(
            login({
              uid: user.uid,
            })
          );
          void navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error during getRedirectResult:', error);
      });
  }, []);

  return (
    <Button variant="contained" onClick={signInWithGoogle}>
      ログイン
    </Button>
  );
};
