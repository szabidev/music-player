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
}

const AppContext = createContext<ContextProps>({
  music: [],
  setMusic: () => [],

  albums: [],
  setAlbums: () => [],
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [music, setMusic] = useState([]);
  const [albums, setAlbums] = useState<any>([]);

  const handleBands = async () => {
    const response = await fetchBands();
    const data = await response.json();
    const allAlbums = data.map((band: any) => band.albums).flat();

    setMusic(data);
    setAlbums(allAlbums);
  };
  console.log(albums);
  useEffect(() => {
    handleBands();
  }, []);

  return (
    <AppContext.Provider value={{ music, setMusic, albums, setAlbums }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
