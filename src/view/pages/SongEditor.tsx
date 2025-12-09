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
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border border-amber-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 sm:mb-6">
            Add New Song
          </h1>

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-stone-700 font-semibold mb-2">
              Song Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title..."
              className="w-full bg-white text-stone-800 px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-orange-500 focus:outline-none shadow-sm"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <label className="block text-stone-700 font-semibold mb-2">
              Song Lyrics & Chords
            </label>
            <p className="text-stone-600 text-sm mb-3">
              Tip: Write chord names above the lyrics where you want them to
              appear
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Example:&#10;    C           G           Am          F&#10;Amazing grace how sweet the sound&#10;     C              G        C&#10;That saved a wretch like me"
              rows={20}
              className="w-full bg-white text-stone-800 px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-orange-500 focus:outline-none font-mono shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? "Saving..." : "Save Song"}
            </button>
            <button
              onClick={() => navigate("/songbook")}
              disabled={isLoading}
              className="flex-1 bg-stone-400 hover:bg-stone-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
