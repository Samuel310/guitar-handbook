import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import * as songBookController from "../../controller/songBookController";

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const song = useAppSelector((state) =>
    state.songBook.songs.find((s) => s.id === id)
  );
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.songBook.isLoading);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!song) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Song Not Found</h1>
          <button
            onClick={() => navigate("/songbook")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            Back to Song Book
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a song title");
      return;
    }

    if (!user?.uid || !song) {
      alert("You must be logged in to edit songs");
      return;
    }

    try {
      await dispatch(
        songBookController.updateSong(user.uid, song.id, title, content)
      );
      setIsEditing(false);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Failed to update song:", error);
      }
      alert("Failed to update song. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!user?.uid || !song) {
      alert("You must be logged in to delete songs");
      return;
    }

    if (confirm("Are you sure you want to delete this song?")) {
      try {
        await dispatch(songBookController.deleteSong(user.uid, song.id));
        navigate("/songbook");
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to delete song:", error);
        }
        alert("Failed to delete song. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border border-amber-200">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white text-stone-800 px-3 sm:px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-orange-500 focus:outline-none text-xl sm:text-2xl font-bold shadow-sm"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-900">
                  {song.title}
                </h1>
              )}
              <p className="text-stone-500 text-sm mt-2">
                Last updated: {new Date(song.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full bg-white text-stone-800 px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-orange-500 focus:outline-none font-mono shadow-sm"
              />
            ) : (
              <div className="bg-amber-50 rounded-lg p-6 text-stone-800 whitespace-pre-wrap font-mono border border-amber-200">
                {song.content || "No content yet."}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setTitle(song.title);
                    setContent(song.content);
                    setIsEditing(false);
                  }}
                  disabled={isLoading}
                  className="flex-1 bg-stone-400 hover:bg-stone-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setTitle(song.title);
                    setContent(song.content);
                    setIsEditing(true);
                  }}
                  disabled={isLoading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Edit Song
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => navigate("/songbook")}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-stone-400 hover:bg-stone-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
