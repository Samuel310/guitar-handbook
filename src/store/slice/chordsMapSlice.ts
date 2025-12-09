import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type ChordMap from "../../model/ChordMap";

interface ChordsMapState {
  chordsMap: ChordMap[];
  isLoading: boolean;
  error: string | null;
  isLoaded: boolean;
}

const initialState: ChordsMapState = {
  chordsMap: [],
  isLoading: false,
  error: null,
  isLoaded: false,
};

const chordsMapSlice = createSlice({
  name: "chordsMap",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setChordsMap: (state, action: PayloadAction<ChordMap[]>) => {
      state.chordsMap = action.payload;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetChordsMap: (state) => {
      state.chordsMap = [];
      state.isLoaded = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setChordsMap,
  setError,
  clearError,
  resetChordsMap,
} = chordsMapSlice.actions;

export default chordsMapSlice.reducer;
