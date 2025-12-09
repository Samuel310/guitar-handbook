import { useState } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../store/hooks';

export default function SongBook() {
  const songs = useAppSelector((state) => state.songBook.songs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">My Private Song Book</h1>
          <Link
            to="/songbook/new"
            className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors shadow-lg"
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
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border-2 border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Songs Grid */}
        {filteredSongs.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-6 sm:p-8 md:p-12 text-center">
            <p className="text-slate-400 text-base sm:text-lg md:text-xl">
              {songs.length === 0
                ? 'No songs yet. Click "Add New Song" to create your first song!'
                : 'No songs found matching your search.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song) => (
              <Link
                key={song.id}
                to={`/songbook/${song.id}`}
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-all hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-blue-500"
              >
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {song.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Updated: {new Date(song.updatedAt).toLocaleDateString()}
                </p>
                <div className="text-slate-300 text-sm line-clamp-3 whitespace-pre-wrap">
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
