import { useState } from "react";
import { useAppProvider } from "../../../context/app-provider";
import Modal from "../../modal/Modal";
import DeleteSong from "../../delete-song/DeleteSong";
import { MdFavorite } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

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
  const { music, albums, favorites, setFavorites } = useAppProvider();
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log(favorites, "favorites");

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
  console.log(albums, "albums");
  console.log(music, "music");
  console.log(favorites, "favorites");
  return (
    <div>
      <h3 className="text-2xl text-slate-500 font-bold mb-5">My Music</h3>
      <table className="table-auto w-full text-slate-500">
        <thead>
          <tr>
            <th className="w-2/3 text-left">Name</th>
            <th className="text-center">Streams</th>
            <th className="text-center">Length</th>
            <th className="text-center">Saves</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {music.map((artist: any) =>
            artist.albums.map((album: any) =>
              album.songs.map((song: any) => (
                <tr key={song.id} className="border-t border-fuchsia-200">
                  <td className="flex items-center py-4 space-x-3">
                    <img
                      className="w-[60px] h-[60px] rounded-lg mr-3"
                      src="/assets/img/no-image.png"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{song.title}</p>
                      <p className="font-light">{artist.name}</p>
                    </div>
                  </td>
                  <td className="text-center">
                    {(
                      Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000
                    ).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </td>
                  <td className="text-center">{song.length}</td>
                  <td>
                    <div className="flex justify-center items-center">
                      {favorites.some(
                        (fav: any) => fav.song._id === song._id
                      ) ? (
                        <MdFavorite
                          size={20}
                          color="#d946ef"
                          onClick={() =>
                            toggleFavorite(song, artist.name, album.title)
                          }
                        />
                      ) : (
                        <CiHeart
                          size={20}
                          onClick={() =>
                            toggleFavorite(song, artist.name, album.title)
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td className="text-center">
                    <MdDeleteForever size={20} onClick={openModal} />
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
  );
};

export default Library;
