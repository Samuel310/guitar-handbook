import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import * as authController from "../../controller/authController";

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-xl sm:text-2xl font-bold text-amber-900 hover:text-orange-600 transition-colors"
          >
            🎸 Guitar Handbook
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-900 p-2 hover:bg-amber-100 rounded-lg transition-colors"
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
          <div className="hidden md:flex gap-2 items-center">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/nashville"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive('/nashville')
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  Nashville
                </Link>
                <Link
                  to="/songbook"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname.startsWith('/songbook')
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  Song Book
                </Link>
              </>
            )}
            
            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={`${user.displayName || 'User'}'s profile picture`} 
                    className="w-8 h-8 rounded-full border-2 border-amber-400"
                  />
                )}
                <button
                  onClick={() => dispatch(authController.signOut())}
                  disabled={isLoading}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(authController.signInWithGoogle(null))}
                disabled={isLoading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 ml-2 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            )}
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
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/nashville"
                  onClick={handleLinkClick}
                  className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive('/nashville')
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  Nashville
                </Link>
                <Link
                  to="/songbook"
                  onClick={handleLinkClick}
                  className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname.startsWith('/songbook')
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  Song Book
                </Link>
              </>
            )}
            
            {/* Mobile Auth buttons */}
            {isAuthenticated ? (
              <div className="pt-2 border-t border-amber-200 mt-2">
                {user?.photoURL && (
                  <div className="flex items-center gap-2 px-4 py-2 text-stone-700">
                    <img 
                      src={user.photoURL} 
                      alt={`${user.displayName || 'User'}'s profile picture`} 
                      className="w-8 h-8 rounded-full border-2 border-amber-400"
                    />
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    dispatch(authController.signOut());
                    handleLinkClick();
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatch(authController.signInWithGoogle(null));
                  handleLinkClick();
                }}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
