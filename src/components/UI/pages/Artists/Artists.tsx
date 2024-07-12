import { useEffect, useState } from "react";
import { useAppProvider } from "../../../../context/app-provider";
import ArtistCard from "../../../artist-card/ArtistCard";
import SearchForm from "../../search-form/SearchForm";
import { Artist } from "../../../../utils/types";
import { fetchBands } from "../../../../api/bands.api";

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
  console.log(music, "music");
  console.log(artistsToDisplay, "artistsToDisplay");
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
    </div>
  );
};

export default Artists;
