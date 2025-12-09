import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  setLoading,
  setSongs,
  addSongToState,
  updateSongInState,
  deleteSongFromState,
  setError,
  clearError,
} from "../store/slice/songBookSlice";
import type { AppDispatch } from "../store/store";
import type Song from "../model/Song";

// Helper to get user's songs collection path
const getUserSongsCollection = (userId: string) => {
  return collection(db, "users", userId, "songs");
};

export const loadSongs = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const songsCollection = getUserSongsCollection(userId);
    const q = query(songsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const songsData: Song[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      songsData.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });

    dispatch(setSongs(songsData));
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load songs from Firestore";
    dispatch(setError(errorMessage));
    if (import.meta.env.DEV) {
      console.error("Load Songs Error:", error);
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadSong =
  (userId: string, songId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const songDoc = doc(db, "users", userId, "songs", songId);
      const snapshot = await getDoc(songDoc);

      if (snapshot.exists()) {
        const data = snapshot.data();
        const song: Song = {
          id: snapshot.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        dispatch(addSongToState(song));
      } else {
        dispatch(setError("Song not found"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load song from Firestore";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Load Song Error:", error);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createSong =
  (userId: string, title: string, content: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const songsCollection = getUserSongsCollection(userId);
      const now = new Date().toISOString();

      const songData = {
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(songsCollection, songData);

      const newSong: Song = {
        id: docRef.id,
        ...songData,
      };

      dispatch(addSongToState(newSong));
      return newSong;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create song in Firestore";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Create Song Error:", error);
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateSong =
  (userId: string, songId: string, title: string, content: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const songDoc = doc(db, "users", userId, "songs", songId);
      const now = new Date().toISOString();

      const updateData = {
        title,
        content,
        updatedAt: now,
      };

      await updateDoc(songDoc, updateData);

      // Fetch the updated song to get the full data
      const snapshot = await getDoc(songDoc);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const updatedSong: Song = {
          id: snapshot.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        dispatch(updateSongInState(updatedSong));
        return updatedSong;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update song in Firestore";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Update Song Error:", error);
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteSong =
  (userId: string, songId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const songDoc = doc(db, "users", userId, "songs", songId);
      await deleteDoc(songDoc);

      dispatch(deleteSongFromState(songId));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete song from Firestore";
      dispatch(setError(errorMessage));
      if (import.meta.env.DEV) {
        console.error("Delete Song Error:", error);
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const resetSongsState = () => (dispatch: AppDispatch) => {
  dispatch(setSongs([]));
  dispatch(clearError());
};
