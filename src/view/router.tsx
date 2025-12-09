import { createBrowserRouter, redirect } from 'react-router';
import { store } from '../store/store';
import { loadChordsMap } from '../controller/chordsMapController';
import Layout from './components/Layout';
import Home from './pages/Home';
import Nashville from './pages/Nashville';
import SongBook from './pages/SongBook';
import SongEditor from './pages/SongEditor';
import SongDetail from './pages/SongDetail';

// Loader for Nashville route - loads chords map from Firestore
const nashvilleLoader = async () => {
  const state = store.getState();
  
  // Check authentication
  if (!state.auth.isAuthenticated) {
    return redirect('/');
  }
  
  // Only load from Firestore if not already loaded
  if (!state.chordsMap.isLoaded || state.chordsMap.chordsMap.length === 0) {
    await store.dispatch(loadChordsMap());
  }
  
  return null;
};

// Protected route loader - checks authentication
const protectedLoader = async () => {
  const state = store.getState();
  
  if (!state.auth.isAuthenticated) {
    return redirect('/');
  }
  
  return null;
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/nashville',
        element: <Nashville />,
        loader: nashvilleLoader,
      },
      {
        path: '/songbook',
        element: <SongBook />,
        loader: protectedLoader,
      },
      {
        path: '/songbook/new',
        element: <SongEditor />,
        loader: protectedLoader,
      },
      {
        path: '/songbook/:id',
        element: <SongDetail />,
        loader: protectedLoader,
      },
    ],
  },
]);
