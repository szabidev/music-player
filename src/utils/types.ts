import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface Artist {
  _id: string;
  name: string;
  albums: Album[];
}

export interface Album {
  _id: string;
  title: string;
  songs: any;
  description: string;
}

export interface BandData {
  _id: string;
  name: string;
  albums: Album[];
}

export interface Song {
  title: string;
  length: string;
  _id: string;
}

export interface SongLibrary {
  _id: string;
  title: string;
  artist: string;
  album: string;
  length: string;
}

export interface SongInputProps {
  handleDynamicInputValueChange: (
    albumIndex: number,
    songIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveSong: () => void;
  song: { title: string; length: string };
  index: number;
  albumIndex: number;
}

export interface SongLibrary {
  _id: string;
  title: string;
  artist: string;
  album: string;
  length: string;
}
