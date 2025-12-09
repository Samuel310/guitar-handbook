import { createHashRouter, redirect } from "react-router";
import { store } from "../store/store";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Nashville from "./pages/Nashville";
import SongBook from "./pages/SongBook";
import SongEditor from "./pages/SongEditor";
import SongDetail from "./pages/SongDetail";

// Protected route loader - checks authentication
const protectedLoader = async () => {
  const state = store.getState();

  if (!state.auth.isAuthenticated) {
    return redirect("/");
  }

  return null;
};

export const PROTECTED_ROUTES = ["/nashville", "/songbook"];

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/nashville",
        element: <Nashville />,
        loader: protectedLoader,
      },
      {
        path: "/songbook",
        element: <SongBook />,
        loader: protectedLoader,
      },
      {
        path: "/songbook/new",
        element: <SongEditor />,
        loader: protectedLoader,
      },
      {
        path: "/songbook/:id",
        element: <SongDetail />,
        loader: protectedLoader,
      },
    ],
  },
]);
