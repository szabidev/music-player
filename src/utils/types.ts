import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface Music {}

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
