import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router";
import { auth } from "../../config/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPendingNavigation } from "../../store/slice/authSlice";
import * as authController from "../../controller/authController";
import { PROTECTED_ROUTES } from "../router";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, pendingNavigation } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authController.setUserInfo(firebaseUser));
      dispatch(authController.initializeAuth());
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && pendingNavigation) {
      navigate(pendingNavigation);
      dispatch(setPendingNavigation(null));
    }

    if (
      !isAuthenticated &&
      PROTECTED_ROUTES.some((route) => location.pathname.startsWith(route))
    ) {
      navigate("/");
    }
  }, [
    isAuthenticated,
    pendingNavigation,
    location.pathname,
    navigate,
    dispatch,
  ]);
};
