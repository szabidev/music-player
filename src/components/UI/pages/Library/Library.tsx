import { useEffect, useState } from "react";
import { useAppProvider } from "../../../../context/app-provider";
import { deleteSong } from "../../../../api/bands.api";
import Modal from "../../modal/Modal";
import SearchForm from "../../search-form/SearchForm";
import DeleteMusicData from "../../../delete-data/DeleteMusicData";
import { MdFavorite, MdDeleteForever } from "react-icons/md";
import { CiHeart, CiEdit } from "react-icons/ci";
import { Song, SongLibrary } from "../../../../utils/types";

const Library = () => {
  const { songLibrary, favorites, setFavorites, setSongLibrary } =
    useAppProvider();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SongLibrary[]>([]);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const renderSongs = searchTerm === "" ? songLibrary : searchResults;

  useEffect(() => {}, []);
  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredSongs = songLibrary.filter((song: SongLibrary) =>
        song.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredSongs);
    }
  };

  const resetList = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const openModal = (songId: string) => setActiveModalId(songId);
  const closeModal = () => setActiveModalId(null);

  const toggleFavorite = (song: SongLibrary) => {
    setFavorites((currentFavorites: any) => {
      const exists = currentFavorites.some(
        (fav: any) => fav.song._id === song._id
      );
      const newFavorites = exists
        ? currentFavorites.filter((fav: any) => fav.song._id !== song._id)
        : [...currentFavorites, { song }];
      return newFavorites;
    });
  };

  const handleDelete = (bandId: string, songId: string) => {
    deleteSong(bandId, songId)
      .then(() => {
        console.log("Song deleted successfully");
        setSongLibrary((currentSongs: Song[]) =>
          currentSongs.filter((song) => song._id !== songId)
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to delete song", error);
      });
  };

  console.log(renderSongs, "renderSongs");

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-2xl text-slate-500 font-bold mb-5">My Music</h3>
        <div className="w-1/2">
          <SearchForm
            onSearch={handleSearch}
            data={songLibrary}
            resetList={resetList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchKey="title"
          />
        </div>
      </div>
      <div className="overflow-auto max-h-[75vh]">
        <table className="table-auto w-full text-slate-500">
          <thead>
            <tr>
              <th className="w-2/3 text-left">Name</th>
              <th className="text-center px-2 py-3">Length</th>
              <th className="text-center px-2 py-3">Saves</th>
              <th className="text-center px-2 py-3"></th>
              <th className="text-center px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {renderSongs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  {!searchTerm && <p>No results</p>}
                </td>
              </tr>
            ) : (
              renderSongs.map((song: SongLibrary) => (
                <tr key={song._id} className="border-t border-fuchsia-200">
                  <td className="flex justify-start items-center py-4">
                    <img
                      className="w-[60px] h-[60px] rounded-lg mr-3"
                      src="/assets/img/no-image.png"
                      alt=""
                    />
                    <div className="min-w-80">
                      <p className="font-semibold">{song.title}</p>
                      <p className="font-light">{song.artist}</p>
                    </div>
                    <div>
                      <p>{song.album}</p>
                    </div>
                  </td>
                  <td className="text-center">{song.length}</td>
                  <td className="text-center">
                    <button onClick={() => toggleFavorite(song)}>
                      {favorites.some(
                        (fav: any) => fav.song._id === song._id
                      ) ? (
                        <MdFavorite
                          size={20}
                          className="text-fuchsia-500 cursor-pointer"
                        />
                      ) : (
                        <CiHeart
                          size={20}
                          className="text-fuchsia-500 cursor-pointer"
                        />
                      )}
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => console.log("edit song to be implemented")}
                    >
                      <CiEdit
                        size={20}
                        className="text-fuchsia-500 cursor-pointer"
                      />
                    </button>
                  </td>
                  <td className="text-center">
                    <button onClick={() => openModal(song._id)}>
                      <MdDeleteForever
                        size={20}
                        className="text-slate-500 cursor-pointer"
                      />
                    </button>
                    {activeModalId === song._id && (
                      <Modal onClose={closeModal}>
                        <DeleteMusicData
                          onClose={closeModal}
                          data={song.title}
                          deleteData={() =>
                            handleDelete(song.artistId, song._id)
                          }
                        />
                      </Modal>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
