import React, { useState } from "react";

interface SearchFormProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  data: any[];
  resetList?: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchKey: string;
}

const SearchForm = ({
  onSearch,
  data,
  resetList,
  searchTerm,
  setSearchTerm,
  searchKey,
}: SearchFormProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = data.filter((item: any) =>
        searchKey
          .split(".")
          .reduce((acc, key) => acc && acc[key], item)
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : [{ [searchKey]: "No matches found" }]
      );
    } else {
      setSuggestions([]);
      if (resetList) {
        resetList();
      }
    }
  };

  const handleSelectSuggestion = (value: string) => {
    setSearchTerm(value);
    setSuggestions([]);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="action-search" className="sr-only">
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
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer text-slate-600 bg-gray-100 hover:bg-fuchsia-300 p-2 first:rounded-t-2xl last:rounded-b-2xl transition ease-in duration-200"
              onClick={() =>
                handleSelectSuggestion(
                  searchKey
                    .split(".")
                    .reduce((acc, key) => acc && acc[key], suggestion)
                )
              }
            >
              {searchKey
                .split(".")
                .reduce((acc, key) => acc && acc[key], suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchForm;
