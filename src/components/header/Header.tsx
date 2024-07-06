import React from "react";
import SearchForm from "../search-form/SearchForm";
import UploadMusic from "../music/upload-music/UploadMusic";

const Header = () => {
  return (
    <div className="w-full flex justify-end">
      <SearchForm />
      <UploadMusic />
    </div>
  );
};

export default Header;
