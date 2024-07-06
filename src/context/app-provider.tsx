"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchBands } from "../api/bands.api";

interface ContextProps {
  music: any;
  setMusic: any;
}

const AppContext = createContext<ContextProps>({
  music: [],
  setMusic: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [music, setMusic] = useState([]);

  const handleBands = async () => {
    const response = await fetchBands();
    const data = await response.json();
    setMusic(data);
  };

  useEffect(() => {
    handleBands();
  }, []);

  return (
    <AppContext.Provider value={{ music, setMusic }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
