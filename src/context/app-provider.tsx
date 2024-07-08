"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchBands } from "../api/bands.api";

interface ContextProps {
  music: any;
  setMusic: any;

  albums: any;
  setAlbums: any;

  songs: any;
  setSongs: any;

  favorites: any;
  setFavorites: any;
}

const AppContext = createContext<ContextProps>({
  music: [],
  setMusic: () => [],

  albums: [],
  setAlbums: () => [],

  songs: [],
  setSongs: () => [],

  favorites: [],
  setFavorites: () => [],
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [music, setMusic] = useState([]);
  const [albums, setAlbums] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const handleBands = async () => {
    const response = await fetchBands();
    const data = await response.json();
    const allAlbums = data.map((band: any) => band.albums).flat();
    const allSongs = allAlbums.map((album: any) => album.songs).flat();

    setMusic(data);
    setAlbums(allAlbums);
    setSongs(allSongs);
  };

  useEffect(() => {
    handleBands();
  }, []);

  return (
    <AppContext.Provider
      value={{
        music,
        setMusic,
        albums,
        setAlbums,
        favorites,
        setFavorites,
        songs,
        setSongs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
