"use client";
import { useState } from "react";
import { useAppProvider } from "../../context/app-provider";
import { SongProps } from "../pages/Library/Library";

interface SearchFormProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { songs } = useAppProvider();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = songs.filter((suggestion: any) => {
        console.log(suggestion, "suggestion");
        return suggestion.title.toLowerCase().includes(value.toLowerCase());
      });

      console.log(filteredSuggestions, "filteredSuggestions");
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestion = (value: string) => {
    setSearchTerm(value);
    console.log(value, "value");
    setSuggestions([]);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full">
      <label htmlFor="action-search" className="sr-only ">
        Search
      </label>
      <input
        id="action-search"
        className="form-input pl-9 p-2 outline-none bg-gray-100 w-full rounded-2xl border focus:border-fuchsia-400 placeholder:text-slate-700"
        type="search"
        placeholder="Search..."
        onChange={handleChange}
        value={searchTerm}
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full top-[100%] left-0 right-0 list-none rounded-2xl border border-fuchsia-400">
          {suggestions.map((suggestion) => (
            <li
              className="cursor-pointer text-slate-600 bg-gray-100 hover:bg-fuchsia-300 p-2 first:rounded-t-2xl last:rounded-b-2xl transition ease-in duration-200"
              key={suggestion._id}
              onClick={() => handleSuggestion(suggestion.title)}
              // value={suggestion.title}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchForm;
