import { Outlet } from "react-router";
import Navigation from "./Navigation";
import { useAuthListener } from "../hooks/useAuthListener";

export default function Layout() {
  // Initialize auth listener with router context
  useAuthListener();

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
