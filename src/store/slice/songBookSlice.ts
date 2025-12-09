import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Song from "../../model/Song";

export type { Song };

interface SongBookState {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SongBookState = {
  songs: [],
  isLoading: false,
  error: null,
};

const songBookSlice = createSlice({
  name: "songBook",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    addSongToState: (state, action: PayloadAction<Song>) => {
      const exists = state.songs.some((song) => song.id === action.payload.id);
      if (!exists) {
        state.songs.unshift(action.payload);
      }
      state.isLoading = false;
    },
    updateSongInState: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.isLoading = false;
    },
    deleteSongFromState: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSongs,
  addSongToState,
  updateSongInState,
  deleteSongFromState,
  setError,
  clearError,
} = songBookSlice.actions;
export default songBookSlice.reducer;
