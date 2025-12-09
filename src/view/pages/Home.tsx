import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import * as authController from "../../controller/authController";

export default function Home() {
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      dispatch(authController.signInWithGoogle(path));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Error Alert */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-red-100 text-sm sm:text-base">{error}</p>
              </div>
              <button
                aria-label="Dismiss error"
                onClick={() => dispatch(authController.dismissError())}
                className="text-red-300 hover:text-red-100 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            🎸 Guitar Handbook
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-6 sm:mb-8 px-2">
            Your complete guide to chords, scales, and songs
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Nashville Card */}
          <button
            onClick={() => handleCardClick("/nashville")}
            className="group bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 transform text-left"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              🎵
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Nashville Number System
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-4 sm:mb-6">
              Explore chord progressions and scales for all major and minor
              keys. Perfect for transposing songs and understanding music
              theory.
            </p>
            <div className="flex items-center text-white font-semibold">
              <span>Explore Chords</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
          </button>

          {/* Song Book Card */}
          <button
            onClick={() => handleCardClick("/songbook")}
            className="group bg-linear-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 transform text-left"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              📖
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              My Private Song Book
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-4 sm:mb-6">
              Create, edit, and manage your personal collection of songs with
              chords. Keep all your favorite songs organized in one place.
            </p>
            <div className="flex items-center text-white font-semibold">
              <span>Open Song Book</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 max-w-3xl mx-auto bg-slate-800/50 rounded-xl p-6 sm:p-8 backdrop-blur">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
            Features
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-slate-300">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">
                ✓ Complete Chord Reference
              </h4>
              <p>All 12 major and minor keys with Nashville numbers</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">
                ✓ Private Song Storage
              </h4>
              <p>Save your songs locally with full privacy</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-400 mb-2">
                ✓ Easy Chord Notation
              </h4>
              <p>Write chords above lyrics with simple formatting</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">
                ✓ Quick Search
              </h4>
              <p>Find your songs instantly with search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
