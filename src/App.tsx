import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Nashville from './pages/Nashville';
import SongBook from './pages/SongBook';
import SongEditor from './pages/SongEditor';
import SongDetail from './pages/SongDetail';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nashville" element={<Nashville />} />
        <Route path="/songbook" element={<SongBook />} />
        <Route path="/songbook/new" element={<SongEditor />} />
        <Route path="/songbook/:id" element={<SongDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
