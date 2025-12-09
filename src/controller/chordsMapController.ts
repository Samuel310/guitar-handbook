import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import {
  setLoading,
  setChordsMap,
  setError,
  clearError,
  resetChordsMap,
} from "../store/slice/chordsMapSlice";
import type { AppDispatch, RootState } from "../store/store";
import type ChordMap from "../model/ChordMap";

export const loadChordsMap =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      if (state.chordsMap.isLoaded && state.chordsMap.chordsMap.length > 0) {
        return;
      }

      dispatch(setLoading(true));
      dispatch(clearError());

      const chordsMapCollection = collection(db, "chords-map");
      const snapshot = await getDocs(chordsMapCollection);

      const chordsMapData: ChordMap[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        chordsMapData.push({
          key: data.key,
          group: data.group,
          chords: data.chords,
          notes: data.notes,
        });
      });

      // Sort by group and key (Major before Minor)
      chordsMapData.sort((a, b) => {
        if (a.group !== b.group) {
          return a.group.localeCompare(b.group);
        }
        if (a.key.includes("Major") && b.key.includes("Minor")) {
          return -1;
        }
        if (a.key.includes("Minor") && b.key.includes("Major")) {
          return 1;
        }
        return a.key.localeCompare(b.key);
      });

      dispatch(setChordsMap(chordsMapData));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load chords map";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Load Chords Map Error:", error);
      }
    }
  };

export const resetChordsMapState = () => (dispatch: AppDispatch) => {
  dispatch(resetChordsMap());
};
