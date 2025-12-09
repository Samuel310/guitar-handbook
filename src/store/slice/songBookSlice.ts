import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Song {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface SongBookState {
  songs: Song[];
}

const loadSongsFromLocalStorage = (): Song[] => {
  try {
    const stored = localStorage.getItem('guitarHandbookSongs');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSongsToLocalStorage = (songs: Song[]) => {
  try {
    localStorage.setItem('guitarHandbookSongs', JSON.stringify(songs));
  } catch (error) {
    console.error('Failed to save songs:', error);
  }
};

const initialState: SongBookState = {
  songs: loadSongsFromLocalStorage(),
};

const songBookSlice = createSlice({
  name: 'songBook',
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<Omit<Song, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newSong: Song = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.songs.push(newSong);
      saveSongsToLocalStorage(state.songs);
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        saveSongsToLocalStorage(state.songs);
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      saveSongsToLocalStorage(state.songs);
    },
  },
});

export const { addSong, updateSong, deleteSong } = songBookSlice.actions;
export default songBookSlice.reducer;
