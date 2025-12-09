import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './view/components/Navigation';
import ProtectedRoute from './view/components/ProtectedRoute';
import Home from './view/pages/Home';
import Nashville from './view/pages/Nashville';
import SongBook from './view/pages/SongBook';
import SongEditor from './view/pages/SongEditor';
import SongDetail from './view/pages/SongDetail';
import { useAuthListener } from './view/hooks/useAuthListener';

function App() {
  // Initialize auth listener
  useAuthListener();

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/nashville" 
          element={
            <ProtectedRoute>
              <Nashville />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/songbook" 
          element={
            <ProtectedRoute>
              <SongBook />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/songbook/new" 
          element={
            <ProtectedRoute>
              <SongEditor />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/songbook/:id" 
          element={
            <ProtectedRoute>
              <SongDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
