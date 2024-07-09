import { CiEdit } from "react-icons/ci";
import { Artist } from "../pages/Artists/Artists";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const [activeAlbum, setActiveAlbum] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAccordion = (albumId: string) => {
    setActiveAlbum((prevActiveAlbums) => ({
      ...prevActiveAlbums,
      [albumId]: !prevActiveAlbums[albumId],
    }));
  };

  console.log(artist, "artist");
  return (
    <div className="w-3/4 mx-auto bg-gray-100" key={artist._id}>
      <div className="border border-gray-200 p-4 rounded-lg  mb-12">
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="text-xl font-bold text-slate-600">{artist.name}</h3>
          <div className="flex justify-around w-[100px]">
            <CiEdit size={25} className="text-fuchsia-500 cursor-pointer" />
            <MdDeleteForever
              size={25}
              className="text-slate-600 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full px-2">
          {artist.albums.map((album) => (
            <div className="[&:not(:first-child)]:border-t border-t-fuchsia-300 py-3 my-4 w-full">
              <div className="" key={album._id}>
                <h4 className="text-fuchsia-400 pb-2">{album.title}</h4>
                <p className="text-slate-600 text-sm">{album.description}</p>
                <div
                  className="mt-4 flex justify-between items-center w-[90%] mx-auto"
                  onClick={() => handleAccordion(album._id)}
                >
                  <p className="text-slate-600">
                    Click here to see a list of songs
                  </p>
                  <IoIosArrowDown
                    className={`text-fuchsia-500 cursor-pointer transform transition-transform duration-300 ${
                      activeAlbum[album._id] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>
              {activeAlbum[album._id] && (
                <div className="w-[90%] mt-4 mx-auto border-t border-t-fuchsia-300 ">
                  {album.songs.map((song: any) => (
                    <div className={`flex justify-between items-center py-2 `}>
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
