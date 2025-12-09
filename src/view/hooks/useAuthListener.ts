import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAppDispatch } from "../../store/hooks";
import * as authController from "../../controller/authController";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authController.setUserInfo(firebaseUser));
      dispatch(authController.initializeAuth());
    });
    return () => unsubscribe();
  }, [dispatch]);
};
