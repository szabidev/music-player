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

  songLibrary: any;
  setSongLibrary: any;

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

  songLibrary: [],
  setSongLibrary: () => [],

  favorites: [],
  setFavorites: () => [],
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [music, setMusic] = useState([]);
  const [albums, setAlbums] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [songLibrary, setSongLibrary] = useState<any>([]);

  const handleBands = async () => {
    const response = await fetchBands();
    const data = await response.json();
    const allAlbums = data.map((band: any) => band.albums).flat();
    const allSongs = allAlbums.map((album: any) => album.songs).flat();

    const newSongList = allSongs.map((song: any) => ({
      artist: data.find((band: any) =>
        band.albums.some((album: any) => album.songs.includes(song))
      ).name,
      album: allAlbums.find((album: any) => album.songs.includes(song)).title,
      title: song.title,
      length: song.length,
      _id: song._id,
    }));

    setMusic(data);
    setAlbums(allAlbums);
    setSongs(allSongs);
    setSongLibrary(newSongList);
  };

  console.log(music, "music");
  console.log(albums, "allAlbums");
  console.log(songs, "allSongs");
  console.log(songLibrary, "songList");

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
        songLibrary,
        setSongLibrary,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
