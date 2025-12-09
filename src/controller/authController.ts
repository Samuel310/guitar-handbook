import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "@firebase/auth";
import { auth } from "../config/firebase";
import {
  setLoading,
  setUser,
  setError,
  clearError,
  setInitialized,
  setPendingNavigation,
} from "../store/slice/authSlice";
import type { AppDispatch } from "../store/store";
import type User from "../model/User";
import { resetSongsState } from "./songBookController";

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
});

const signInWithGoogle =
  (pendingNavigation: string | null) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const user = mapFirebaseUser(result.user);
        dispatch(setUser(user));
        dispatch(setPendingNavigation(pendingNavigation));
      } else {
        dispatch(setError("Failed to sign in with Google"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Google Sign-In Error:", error);
      }
    }
  };

const signOut = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    await firebaseSignOut(auth);
    dispatch(setUser(null));
    dispatch(resetSongsState());
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to sign out";
    dispatch(setError(errorMessage));
    if (import.meta.env.DEV) {
      console.error("Google Sign-Out Error:", error);
    }
  }
};

const setUserInfo =
  (firebaseUser: FirebaseUser | null) => async (dispatch: AppDispatch) => {
    if (firebaseUser) {
      dispatch(setUser(mapFirebaseUser(firebaseUser)));
    } else {
      dispatch(setUser(null));
    }
  };

const initializeAuth = () => async (dispatch: AppDispatch) => {
  dispatch(setInitialized(true));
};

const dismissError = () => async (dispatch: AppDispatch) => {
  dispatch(clearError());
};

export { signInWithGoogle, signOut, setUserInfo, initializeAuth, dismissError };
