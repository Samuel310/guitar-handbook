import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-xl sm:text-2xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            🎸 Guitar Handbook
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/nashville"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/nashville')
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Nashville
            </Link>
            <Link
              to="/songbook"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                location.pathname.startsWith('/songbook')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Song Book
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/nashville"
              onClick={handleLinkClick}
              className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/nashville')
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Nashville
            </Link>
            <Link
              to="/songbook"
              onClick={handleLinkClick}
              className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
                location.pathname.startsWith('/songbook')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Song Book
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
