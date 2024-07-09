import { useState } from "react";
import { fetchBand } from "../../../api/bands.api";
import { useAppProvider } from "../../../context/app-provider";
import ArtistCard from "../../artist-card/ArtistCard";
import SearchForm from "../../search-form/SearchForm";
import { SongProps } from "../Library/Library";

export interface Artist {
  _id: string;
  name: string;
  albums: Album[];
}

interface Album {
  _id: string;
  title: string;
  songs: SongProps[];
  description: string;
}

const Artists = () => {
  const { music } = useAppProvider();
  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const artistsToDisplay = searchResults.length > 0 ? searchResults : music;

  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await fetchBand(searchTerm);
      if (response.ok) {
        const data: Artist[] = await response.json();
        setSearchResults(data);
      } else {
        console.error("Error fetching bands:", response.statusText);
      }

      console.log(searchResults, "searchResults");
    } catch (error) {
      console.error("Error fetching bands:", error);
    }
  };

  console.log(artistsToDisplay, "artistsToDisplay");
  return (
    <div className="w-full">
      <div className="mx-auto w-2/4 mb-10">
        <SearchForm onSearch={handleSearch} />
      </div>
      {artistsToDisplay.map((artist: Artist) => (
        <ArtistCard key={artist._id} artist={artist} />
      ))}
    </div>
  );
};

export default Artists;
