import React, { useState, useEffect } from "react";
import SongInput from "../song-input/SongInput";
import { GoPlus } from "react-icons/go";
import { createBand, updateBand } from "../../../api/bands.api";
import { useAppProvider } from "../../../context/app-provider";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../../UI/modal/Modal";
import DeleteMusicData from "../../delete-data/DeleteMusicData";

interface AlbumData {
  title: string;
  songs: { title: string; length: string }[];
  description: string;
}

interface BandData {
  _id?: string;
  name: string;
  albums: AlbumData[];
}

interface UploadArtistProps {
  onClose: (event: any) => void;
  initialData?: BandData;
}

const UploadArtist = ({ onClose, initialData }: UploadArtistProps) => {
  const { setMusic } = useAppProvider();
  const [bandData, setBandData] = useState({
    name: initialData?.name || "",
    albums: initialData?.albums || [
      { title: "", description: "", songs: [{ title: "", length: "" }] },
    ],
  });
  const [activeAlbumModal, setActiveAlbumModal] = useState<number | null>(null);

  const closeModal = () => {
    setActiveAlbumModal(null);
  };
  const openModal = (index: number, event: any) => {
    event.preventDefault();
    setActiveAlbumModal(index);
  };

  useEffect(() => {
    if (initialData) {
      setBandData({
        name: initialData.name,
        albums: initialData.albums,
      });
    }
  }, [initialData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBandData({ ...bandData, name: e.target.value });
  };

  const handleAlbumChange = (index: number, field: any, value: any) => {
    const updatedAlbums = [...bandData.albums];
    updatedAlbums[index] = { ...updatedAlbums[index], [field]: value };
    setBandData({ ...bandData, albums: updatedAlbums });
  };

  const handleSongChange = (
    albumIndex: number,
    songIndex: number,
    field: any,
    value: any
  ) => {
    const updatedAlbums = [...bandData.albums];
    const updatedSongs = [...updatedAlbums[albumIndex].songs];
    updatedSongs[songIndex] = { ...updatedSongs[songIndex], [field]: value };
    updatedAlbums[albumIndex].songs = updatedSongs;
    setBandData({ ...bandData, albums: updatedAlbums });
  };

  const handleAddAlbum = () => {
    setBandData({
      ...bandData,
      albums: [
        ...bandData.albums,
        { title: "", description: "", songs: [{ title: "", length: "" }] },
      ],
    });
  };

  const handleAddSong = (albumIndex: number) => {
    const updatedAlbums = [...bandData.albums];
    updatedAlbums[albumIndex].songs.push({ title: "", length: "" });
    setBandData({ ...bandData, albums: updatedAlbums });
  };

  const handleDynamicInputValueChange = (
    albumIndex: number,
    songIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    handleSongChange(albumIndex, songIndex, name, value);
  };

  const handleRemoveSong = (albumIndex: number, songIndex: number) => {
    const updatedAlbums = [...bandData.albums];
    updatedAlbums[albumIndex].songs.splice(songIndex, 1);
    setBandData({ ...bandData, albums: updatedAlbums });
  };

  const handleRemoveAlbum = (index: number) => {
    const filteredAlbums = bandData.albums.filter((_, idx) => idx !== index);
    setBandData({ ...bandData, albums: filteredAlbums });
    setActiveAlbumModal(null);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let updatedArtist: any;
      if (initialData && initialData._id) {
        updatedArtist = await updateBand(initialData._id, bandData);
        setMusic((prevMusic: any) =>
          prevMusic.map((artist: any) =>
            artist._id === initialData._id ? updatedArtist : artist
          )
        );
      } else {
        updatedArtist = await createBand(bandData);
        setMusic((prevMusic: any) => [...prevMusic, updatedArtist]);
      }
      onClose(event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-full  lg:w-2/3 xl-w-full py-2 bg-gray-100 cursor-default pointer-events-auto relative rounded-xl mx-auto shadow-lg border border-gray-200">
      <button
        tabIndex={-1}
        type="button"
        className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
        onClick={onClose}
      >
        <svg
          tabIndex={-1}
          className="h-4 w-4 cursor-pointer text-fuchsia-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close</span>
      </button>
      <div className="space-y-2 p-2 w-full sm:w-full">
        <div className="p-4 space-y-2 text-center">
          <h2
            className="text-xl font-bold tracking-tight"
            id="page-action.heading"
          >
            {initialData ? "Edit Artist" : "Add Artist"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="w-full sm:w-full">
              <div className="w-full my-3">
                <label
                  htmlFor="artist-name"
                  className="pl-3 block text-sm text-left font-medium text-gray-700"
                >
                  Artist Name
                </label>
                <input
                  required
                  value={bandData.name}
                  onChange={handleNameChange}
                  type="text"
                  id="artist-name"
                  placeholder="Name"
                  className="py-2 px-3 mt-1 block w-full sm:w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                />
              </div>
              {/* ALBUM INPUT */}
              {bandData.albums.map((album, albumIndex) => (
                <div key={`album-${albumIndex}`}>
                  <div className="flex">
                    <div className="w-full my-3">
                      <label
                        htmlFor={`album-name-${albumIndex}`}
                        className="pl-3 block text-sm text-left font-medium text-gray-700"
                      >
                        Album Name
                      </label>
                      <div className="flex justify-center items-center">
                        <input
                          required
                          value={album.title}
                          onChange={(e) =>
                            handleAlbumChange(
                              albumIndex,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Album name"
                          type="text"
                          id={`album-name-${albumIndex}`}
                          className="py-2 px-3 mt-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                        />
                        <button
                          onClick={(e) => {
                            openModal(albumIndex, e);
                          }}
                        >
                          <MdDeleteForever
                            size={20}
                            className="text-slate-500 cursor-pointer"
                          />
                        </button>

                        {activeAlbumModal === albumIndex && (
                          <Modal onClose={closeModal}>
                            <DeleteMusicData
                              onClose={closeModal}
                              data={album.title}
                              deleteData={() => handleRemoveAlbum(albumIndex)}
                            />
                          </Modal>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* ALBUM INPUT */}
                  {/* ALBUM DESCRIPTION */}
                  <div className="my-3">
                    <label
                      htmlFor={`album-description-${albumIndex}`}
                      className="pl-3 block text-sm text-left font-medium text-gray-700"
                    >
                      Album Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={album.description}
                      onChange={(e) =>
                        handleAlbumChange(
                          albumIndex,
                          "description",
                          e.target.value
                        )
                      }
                      id={`album-description-${albumIndex}`}
                      className="mt-1 px-2 py-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                    />
                  </div>
                  {/* ALBUM DESCRIPTION */}
                  {/* SONG LIST */}
                  <div className="px-2 max-h-[30dvh] overflow-y-auto">
                    {album.songs.map((song, songIndex) => (
                      <SongInput
                        key={`${Math.floor(Math.random())}-${songIndex}`}
                        index={songIndex}
                        albumIndex={albumIndex}
                        song={song}
                        handleDynamicInputValueChange={
                          handleDynamicInputValueChange
                        }
                        handleRemoveSong={() =>
                          handleRemoveSong(albumIndex, songIndex)
                        }
                      />
                    ))}
                  </div>
                  {/* SONG LIST */}
                  <button
                    type="button"
                    onClick={() => handleAddSong(albumIndex)}
                    className="mt-8 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
                  >
                    <GoPlus size={25} className="text-white cursor-pointer" />
                    <span className="text-sm">Add another song</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddAlbum}
              className="mt-8 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
            >
              <GoPlus size={25} className="text-white cursor-pointer" />
              <span className="text-sm">Add another album</span>
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-2">
        <div
          aria-hidden="true"
          className="border-t border-fuchsia-300 px-2"
        ></div>

        <div className="px-6 py-2">
          <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
            <button
              type="button"
              className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-slate-500 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600"
              onClick={onClose}
            >
              <span className="flex items-center gap-1">
                <span className="">Cancel</span>
              </span>
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
            >
              <span className="flex items-center gap-1">
                <span className="">Confirm</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArtist;
