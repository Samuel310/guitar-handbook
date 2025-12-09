import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../config/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPendingNavigation } from "../../store/slice/authSlice";
import * as authController from "../../controller/authController";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, pendingNavigation } = useAppSelector(
    (state) => state.auth
  );

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authController.setUserInfo(firebaseUser));
      dispatch(authController.initializeAuth());
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Handle redirect
  useEffect(() => {
    if (isAuthenticated && pendingNavigation) {
      navigate(pendingNavigation);
      dispatch(setPendingNavigation(null));
    }
    if (!isAuthenticated) {
      navigate("/");
      dispatch(setPendingNavigation(null));
    }
  }, [isAuthenticated, pendingNavigation, navigate, dispatch]);
};
