import { useAppProvider } from "../../context/app-provider";
import { useState } from "react";
import Modal from "../UI/modal/Modal";
import DeleteMusicData from "../delete-data/DeleteMusicData";
import { CiEdit } from "react-icons/ci";
import { Artist } from "../../utils/types";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import UploadArtist from "../upload-artist/UploadArtist";

const ArtistCard = ({ artist }: { artist?: Artist }) => {
  const { deleteBand } = useAppProvider();
  const [activeAlbum, setActiveAlbum] = useState<{
    [key: string]: boolean;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleAccordion = (albumId: string) => {
    setActiveAlbum((prevActiveAlbums) => ({
      ...prevActiveAlbums,
      [albumId]: !prevActiveAlbums[albumId],
    }));
  };

  const openModal = (event: any) => {
    event.stopPropagation();
    setShowModal(true);
  };
  const closeModal = (event: any) => {
    event.stopPropagation();
    setShowEdit(false);
    setShowModal(false);
  };

  const showEditModal = () => {
    setShowEdit(true);
  };

  const deleteArtist = () => {
    if (!artist) return;
    deleteBand(artist._id);
  };

  console.log(artist, "artist");
  return (
    <div className="w-3/4 mx-auto bg-gray-100">
      <div className="border border-gray-200 p-4 rounded-lg  mb-12">
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="text-xl font-bold text-slate-600">
            {artist ? artist.name : "New Artist"}
          </h3>
          <div className="flex justify-around w-[100px]">
            <CiEdit
              size={25}
              className="text-fuchsia-500 cursor-pointer"
              onClick={showEditModal}
            />
            <MdDeleteForever
              onClick={(e) => openModal(e)}
              size={25}
              className="text-slate-600 cursor-pointer"
            />
          </div>
          {showEdit && (
            <Modal onClose={closeModal}>
              {artist && (
                <UploadArtist onClose={closeModal} initialData={artist} />
              )}
            </Modal>
          )}
          {showModal && (
            <Modal onClose={closeModal}>
              <DeleteMusicData
                onClose={(e) => closeModal(e)}
                data={artist?.name ?? ""}
                deleteData={deleteArtist}
              />
            </Modal>
          )}
        </div>
        <div className="w-full px-2">
          {artist?.albums.map((album, albumIndex) => (
            <div
              key={`${album._id}-${albumIndex}-${album.title}`}
              className="[&:not(:first-child)]:border-t border-t-fuchsia-300 py-3 my-4 w-full"
            >
              <div className="" key={`${album._id}-${album.title}`}>
                <h4 className="text-fuchsia-400 pb-2">{album.title}</h4>
                <p className="text-slate-600 text-sm">{album.description}</p>
                <div
                  className="mt-4 flex justify-end items-center w-[90%] mx-auto"
                  onClick={() => handleAccordion(album._id)}
                >
                  <p className="text-slate-600 pr-2">Songs</p>
                  <IoIosArrowDown
                    className={`text-fuchsia-500 cursor-pointer transform transition-transform duration-300 ${
                      activeAlbum[album._id] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>
              {activeAlbum[album._id] && (
                <div className="w-[90%] mt-4 mx-auto border-t border-t-fuchsia-300 ">
                  {album.songs.map((song: any, songIndex: number) => (
                    <div
                      key={`${song._id}-${songIndex}-${song.title}`}
                      className={`flex justify-between items-center py-2 `}
                    >
                      <p className="text-slate-600">{song.title}</p>
                      <p className="text-slate-600">{song.length}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
