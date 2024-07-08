"use client";
import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useAppProvider } from "../../context/app-provider";
import { SongProps } from "../pages/Library/Library";

interface SearchFormProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchValue, setSearchValue] = useState<any>([]);
  const { songs } = useAppProvider();

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const onClear = () => {
    setSearchValue("");
  };
  console.log(songs, "songs");

  return (
    <ReactSearchAutocomplete
      items={songs}
      onSearch={handleOnSearch}
      onSelect={(item) => console.log(item)}
      onClear={onClear}
      resultStringKeyName="title"
      styling={{ zIndex: 1000 }}
      className="relative w-1/4"
    />
  );
};

export default SearchForm;
