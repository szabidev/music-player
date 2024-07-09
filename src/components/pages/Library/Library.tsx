import { useState } from "react";
import { useAppProvider } from "../../../context/app-provider";

import Modal from "../../modal/Modal";
import SearchForm from "../../search-form/SearchForm";
import DeleteSong from "../../delete-song/DeleteSong";
import { MdFavorite } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
// import { Artist } from "../Artists/Artists";
// import { fetchBand } from "../../../api/bands.api";

export interface SongProps {
  _id: string;
  title: string;
  length: string;
}

interface FavoritSongProps {
  albumTitle: string;
  artistName: string;
  song: SongProps;
}

const Library = () => {
  const { music, favorites, setFavorites } = useAppProvider();
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
  console.log(favorites, "favorites");

  const handleSearch = async (searchTerm: string) => {
    console.log(searchTerm, "searchTerm");
    // const repsone = await fetchBand(searchTerm);
    // const data = await repsone.json();
    // console.log(data, "data");
    // const filteredSongs = data.map((band: Artist) => band.albums).flat();
    // console.log(filteredSongs, "filteredSongs");
    // setFilteredSongs(filteredSongs);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const toggleFavorite = (
    song: SongProps,
    artistName: string,
    albumTitle: string
  ) => {
    const favoriteItem = { song, artistName, albumTitle };

    setFavorites((currentFavorites: FavoritSongProps[]) => {
      const exists = currentFavorites.some(
        (fav: FavoritSongProps) => fav.song._id === song._id
      );

      const newFavorites = exists
        ? currentFavorites.filter((fav: any) => fav.song._id !== song._id)
        : [...currentFavorites, favoriteItem];

      return newFavorites;
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl text-slate-500 font-bold mb-5">My Music</h3>
        <div className="w-1/2">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      <div className="overflow-auto max-h-[75dvh]">
        <table className="table-auto w-full text-slate-500 ">
          <thead className="">
            <tr>
              <th className="w-2/3 text-left">Name</th>
              <th className="text-center px-2 py-3">Length</th>
              <th className="text-center px-2 py-3">Saves</th>
              <th className="text-center px-2 py-3"></th>
              <th className="text-center px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {music.map((artist: any) =>
              artist.albums.map((album: any) =>
                album.songs.map((song: any) => (
                  <tr key={song.id} className="border-t border-fuchsia-200">
                    <td className="flex justify-start items-center py-4">
                      <img
                        className="w-[60px] h-[60px] rounded-lg mr-3"
                        src="/assets/img/no-image.png"
                        alt=""
                      />
                      <div className="min-w-80">
                        <p className="font-semibold">{song.title}</p>
                        <p className="font-light">{artist.name}</p>
                      </div>
                      <div className="">
                        <p>{album.title}</p>
                      </div>
                    </td>
                    <td className="text-center">{song.length}</td>
                    <td className="px-2 py-3">
                      <div className="flex justify-center items-center">
                        {favorites.some(
                          (fav: any) => fav.song._id === song._id
                        ) ? (
                          <MdFavorite
                            className="cursor-pointer"
                            size={20}
                            color="#d946ef"
                            onClick={() =>
                              toggleFavorite(song, artist.name, album.title)
                            }
                          />
                        ) : (
                          <CiHeart
                            size={20}
                            className="text-fuchsia-500 cursor-pointer"
                            onClick={() =>
                              toggleFavorite(song, artist.name, album.title)
                            }
                          />
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <CiEdit
                        size={20}
                        className="text-fuchsia-500 cursor-pointer"
                      />
                    </td>
                    <td className="text-center">
                      <MdDeleteForever
                        size={20}
                        onClick={openModal}
                        className="cursor-pointer"
                      />
                      {showModal && (
                        <Modal onClose={closeModal}>
                          <DeleteSong onClose={closeModal} />
                        </Modal>
                      )}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
