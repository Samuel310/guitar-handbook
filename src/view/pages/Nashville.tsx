import { useState, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { loadChordsMap } from "../../controller/chordsMapController";

const keyGroups: string[] = ["C", "D", "E", "F", "G", "A", "B"];

export default function Nashville() {
  const dispatch = useAppDispatch();
  const [selectedKey, setSelectedKey] = useState<string>(keyGroups[0]);

  const chordsMap = useAppSelector((state) => state.chordsMap.chordsMap);
  const isLoading = useAppSelector((state) => state.chordsMap.isLoading);

  // Load chords map data when component mounts
  useEffect(() => {
    dispatch(loadChordsMap());
  }, [dispatch]);

  const currentData = useMemo(() => {
    return chordsMap.filter((chord) => {
      return chord.group.includes(selectedKey);
    });
  }, [chordsMap, selectedKey]);

  if (isLoading || !currentData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading chords data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
          Nashville Number System
        </h1>

        {/* Key Selector */}
        <div className="bg-slate-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">
          <label className="block text-slate-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            Select Key:
          </label>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-slate-600 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
          >
            {keyGroups.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Chords Table */}
        {currentData.length === 0 ? (
          <div className="text-center text-white text-lg">
            No chords data available for the selected key.
          </div>
        ) : null}

        {currentData.length > 0
          ? currentData.map((chordData, mainIndex) => {
              return (
                <div
                  key={mainIndex}
                  className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden mb-6 sm:mb-8"
                >
                  <div className="p-4 sm:p-6 bg-linear-to-r from-purple-600 to-pink-600">
                    <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                      {chordData.key}
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed sm:table-auto">
                      <tbody>
                        {/* Nashville Numbers Row */}
                        <tr className="bg-slate-700 border-b-2 border-slate-600">
                          <td className="px-1.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 font-bold text-purple-400 text-xs sm:text-sm md:text-base lg:text-lg w-16 sm:w-auto">
                            Nash
                            <span className="hidden sm:inline">ville</span>
                          </td>
                          {chordData.chords.map((_, index) => (
                            <td
                              key={index}
                              className="px-1 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-center font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg"
                            >
                              {index + 1}
                            </td>
                          ))}
                        </tr>

                        {/* Chords Row */}
                        <tr className="bg-slate-750 border-b-2 border-slate-600">
                          <td className="px-1.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 font-bold text-pink-400 text-xs sm:text-sm md:text-base lg:text-lg w-16 sm:w-auto">
                            Chords
                          </td>
                          {chordData.chords.map((chord, index) => (
                            <td
                              key={index}
                              className="px-1 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-center font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg bg-slate-700"
                            >
                              {chord}
                            </td>
                          ))}
                        </tr>

                        {/* Notes Row */}
                        <tr className="bg-slate-800">
                          <td className="px-1.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 font-bold text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg w-16 sm:w-auto">
                            Notes
                          </td>
                          {chordData.notes.map((note, index) => (
                            <td
                              key={index}
                              className="px-1 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-center font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg"
                            >
                              {note}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          : null}

        {/* Info Section */}
        <div className="mt-6 sm:mt-8 bg-slate-800 rounded-lg p-4 sm:p-6 text-slate-300">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
            About Nashville Number System
          </h3>
          <p className="leading-relaxed text-sm sm:text-base">
            The Nashville Number System is a method of transcribing music by
            denoting the scale degree on which a chord is built. It's widely
            used in Nashville for recording sessions and allows musicians to
            easily transpose songs to different keys.
          </p>
        </div>
      </div>
    </div>
  );
}
