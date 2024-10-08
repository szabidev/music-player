import { useEffect, useState } from "react";
import { useAppProvider } from "../../../../context/app-provider";
import { fetchBands } from "../../../../api/bands.api";
import ArtistCard from "../../../artist-card/ArtistCard";
import SearchForm from "../../search-form/SearchForm";
import { Artist } from "../../../../utils/types";

const Artists = () => {
  const { music, setMusic } = useAppProvider();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetchBands();
      const data = await response.json();
      setMusic(data);
    };

    fetchMusic();
  }, [setMusic]);

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());

    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredArtists = music.filter((artist: Artist) =>
        artist.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredArtists);
    }
  };

  const resetList = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const artistsToDisplay = searchResults.length > 0 ? searchResults : music;

  return (
    <div className="w-full">
      <div className="mx-auto w-2/4 mb-10">
        <SearchForm
          onSearch={handleSearch}
          data={music}
          resetList={resetList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchKey="name"
        />
      </div>
      {artistsToDisplay.map((artist: Artist) => (
        <ArtistCard key={artist._id} artist={artist} />
      ))}
      {!artistsToDisplay.length && (
        <h2 className="text-center text-2xl text-slate-600">
          No artists found
        </h2>
      )}
    </div>
  );
};

export default Artists;
