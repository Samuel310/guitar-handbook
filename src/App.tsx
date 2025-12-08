import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Nashville from './pages/Nashville';
import SongBook from './pages/SongBook';
import SongEditor from './pages/SongEditor';
import SongDetail from './pages/SongDetail';
import { useAuthListener } from './hooks/useAuthListener';

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
