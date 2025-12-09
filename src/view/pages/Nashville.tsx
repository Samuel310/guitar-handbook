import { useState } from 'react';
import nashvilleData from '../../model/nashvilleChords.json';

interface ChordData {
  key: string;
  nashville: string[];
  chords: string[];
  notes: string[];
}

export default function Nashville() {
  const [selectedType, setSelectedType] = useState<'major' | 'minor'>('major');
  const [selectedKey, setSelectedKey] = useState<string>('C Major');

  const currentData = nashvilleData[selectedType] as ChordData[];
  const selectedChordData = currentData.find(item => item.key === selectedKey) || currentData[0];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
          Nashville Number System
        </h1>

        {/* Type Selector */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => {
              setSelectedType('major');
              setSelectedKey('C Major');
            }}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              selectedType === 'major'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Major Keys
          </button>
          <button
            onClick={() => {
              setSelectedType('minor');
              setSelectedKey('A Minor');
            }}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              selectedType === 'minor'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Minor Keys
          </button>
        </div>

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
            {currentData.map((item) => (
              <option key={item.key} value={item.key}>
                {item.key}
              </option>
            ))}
          </select>
        </div>

        {/* Chords Table */}
        <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-4 sm:p-6 bg-linear-to-r from-purple-600 to-pink-600">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
              {selectedChordData.key}
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
                  {selectedChordData.nashville.map((num, index) => (
                    <td
                      key={index}
                      className="px-1 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-center font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                      {num}
                    </td>
                  ))}
                </tr>

                {/* Chords Row */}
                <tr className="bg-slate-750 border-b-2 border-slate-600">
                  <td className="px-1.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 font-bold text-pink-400 text-xs sm:text-sm md:text-base lg:text-lg w-16 sm:w-auto">
                    Chords
                  </td>
                  {selectedChordData.chords.map((chord, index) => (
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
                  {selectedChordData.notes.map((note, index) => (
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

        {/* Info Section */}
        <div className="mt-6 sm:mt-8 bg-slate-800 rounded-lg p-4 sm:p-6 text-slate-300">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
            About Nashville Number System
          </h3>
          <p className="leading-relaxed text-sm sm:text-base">
            The Nashville Number System is a method of transcribing music by denoting the scale 
            degree on which a chord is built. It's widely used in Nashville for recording sessions 
            and allows musicians to easily transpose songs to different keys.
          </p>
        </div>
      </div>
    </div>
  );
}
