import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface AuthState {
  uid: string | null;
}

const initialState: AuthState = {
  uid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.uid = null;
    },
  },
});

export const selectCurrentUid = (state: RootState) => state.auth.uid;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
