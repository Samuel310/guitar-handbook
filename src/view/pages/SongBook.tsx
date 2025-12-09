import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import * as songBookController from "../../controller/songBookController";

export default function SongBook() {
  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.songBook.songs);
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.songBook.isLoading);
  const error = useAppSelector((state) => state.songBook.error);
  const [searchTerm, setSearchTerm] = useState("");

  // Load songs when component mounts or user changes
  useEffect(() => {
    if (user?.uid) {
      dispatch(songBookController.loadSongs(user.uid));
    }
  }, [dispatch, user?.uid]);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            My Private Song Book
          </h1>
          <Link
            to="/songbook/new"
            className="w-full sm:w-auto text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            + Add New Song
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-stone-800 px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-orange-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 shadow-sm">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-12 text-center shadow-md border border-amber-200">
            <p className="text-stone-600 text-base sm:text-lg md:text-xl">
              Loading songs...
            </p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-12 text-center shadow-md border border-amber-200">
            <p className="text-stone-600 text-base sm:text-lg md:text-xl">
              {songs.length === 0
                ? 'No songs yet. Click "Add New Song" to create your first song!'
                : "No songs found matching your search."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song) => (
              <Link
                key={song.id}
                to={`/songbook/${song.id}`}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-all hover:shadow-lg hover:scale-105 border-2 border-amber-200 hover:border-orange-400"
              >
                <h3 className="text-xl font-bold text-amber-900 mb-2 truncate">
                  {song.title}
                </h3>
                <p className="text-stone-500 text-sm mb-4">
                  Updated: {new Date(song.updatedAt).toLocaleDateString()}
                </p>
                <div className="text-stone-700 text-sm line-clamp-3 whitespace-pre-wrap">
                  {song.content}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
