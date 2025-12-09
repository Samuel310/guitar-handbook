import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as songBookController from "../../controller/songBookController";

export default function SongEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.songBook.isLoading);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a song title");
      return;
    }

    if (!user?.uid) {
      alert("You must be logged in to save songs");
      return;
    }

    try {
      await dispatch(songBookController.createSong(user.uid, title, content));
      navigate("/songbook");
    } catch (error) {
      console.error("Failed to save song:", error);
      alert("Failed to save song. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Add New Song
          </h1>

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-slate-300 font-semibold mb-2">
              Song Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title..."
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-2 border-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <label className="block text-slate-300 font-semibold mb-2">
              Song Lyrics & Chords
            </label>
            <p className="text-slate-400 text-sm mb-3">
              Tip: Write chord names above the lyrics where you want them to
              appear
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Example:&#10;    C           G           Am          F&#10;Amazing grace how sweet the sound&#10;     C              G        C&#10;That saved a wretch like me"
              rows={20}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-2 border-slate-600 focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Song"}
            </button>
            <button
              onClick={() => navigate("/songbook")}
              disabled={isLoading}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
