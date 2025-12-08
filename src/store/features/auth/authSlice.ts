import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../../store';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../../config/firebase';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Helper function to convert Firebase User to our User type
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isInitialized = true;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setLoading, setUser, setError, clearError, setInitialized } = authSlice.actions;
export default authSlice.reducer;

// Async action for signing in with Google
export const signInWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    if (result.user) {
      const user = mapFirebaseUser(result.user);
      dispatch(setUser(user));
    } else {
      dispatch(setError('Failed to sign in with Google'));
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
    dispatch(setError(errorMessage));
    console.error('Google Sign-In Error:', error);
  }
};

// Async action for signing out
export const signOut = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    await firebaseSignOut(auth);
    dispatch(setUser(null));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
    dispatch(setError(errorMessage));
    console.error('Google Sign-Out Error:', error);
  }
};
