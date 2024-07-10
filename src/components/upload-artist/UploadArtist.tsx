// import React, { useState } from "react";
// import SongInput from "../input/SongInput";
// import { GoPlus } from "react-icons/go";
// import { createBand } from "../../api/bands.api";
// // import { handleBands, useAppProvider } from "../../context/app-provider";
// interface AlbumData {
//   title: string;
//   songs: { title: string; length: string }[];
//   description: string;
// }

// interface BandData {
//   name: string;
//   albums: AlbumData[];
// }

// interface UploadArtistProps {
//   onClose: (event: any) => void;
//   initialData?: BandData;
// }

// const UploadArtist = ({ onClose }: UploadArtistProps) => {
//   // const {
//   //   setMusic,
//   //   setAlbums,
//   //   setSongs: songList,
//   //   setSongLibrary,
//   // } = useAppProvider();
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [albumDescription, setAlbumDescription] = useState("");
//   const [songs, setSongs] = useState([{ title: "", length: "" }]);

//   const handleDynamicInputValueChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const { name, value } = event.target as HTMLInputElement;
//     const values = [...songs];
//     values[index] = { ...values[index], [name]: value };
//     setSongs(values);
//   };

//   const handleAddSong = () => {
//     setSongs([...songs, { title: "", length: "" }]);
//   };

//   const handleRemoveSong = (index: number) => {
//     const values = [...songs];
//     values.splice(index, 1);
//     setSongs(values);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const newArtist = {
//       name,
//       albums: [
//         {
//           title,
//           songs,
//           description: albumDescription,
//         },
//       ],
//     };
//     console.log(newArtist, "newArtist");
//     try {
//       const response = await createBand(newArtist);
//       console.log(newArtist, "response");
//       if (response.ok) {
//         setName("");
//         setTitle("");
//         setAlbumDescription("");
//         setSongs([{ title: "", length: "" }]);
//         onClose(event);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-1/3 py-2 bg-gray-100 cursor-default pointer-events-auto relative rounded-xl mx-auto shadow-lg border border-gray-200">
//       <button
//         tabIndex={-1}
//         type="button"
//         className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
//         onClick={onClose}
//       >
//         <svg
//           tabIndex={-1}
//           className="h-4 w-4 cursor-pointer text-fuchsia-500"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           ></path>
//         </svg>
//         <span className="sr-only">Close</span>
//       </button>
//       <div className="space-y-2 p-2">
//         <div className="p-4 space-y-2 text-center">
//           <h2
//             className="text-xl font-bold tracking-tight"
//             id="page-action.heading"
//           >
//             Add Artist
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="w-full">
//               <div className="w-full my-3">
//                 <label
//                   htmlFor="artist-name"
//                   className="pl-3 block text-sm text-left font-medium text-gray-700"
//                 >
//                   Artist Name
//                 </label>
//                 <input
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   type="text"
//                   id="artist-name"
//                   placeholder="Name"
//                   className="py-2 px-3 mt-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
//                 />
//               </div>
//               <div className="w-full my-3">
//                 <label
//                   htmlFor="album-name"
//                   className="pl-3 block text-sm text-left font-medium text-gray-700"
//                 >
//                   Album Name
//                 </label>
//                 <input
//                   required
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Album name"
//                   type="text"
//                   id="album-name"
//                   className="py-2 px-3 mt-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
//                 />
//               </div>

//               <div className="my-3">
//                 <label
//                   htmlFor="album-description"
//                   className="pl-3 block text-sm text-left font-medium text-gray-700"
//                 >
//                   Album Description
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={albumDescription}
//                   onChange={(e) => setAlbumDescription(e.target.value)}
//                   id="album-description"
//                   className="mt-1 px-2 py-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
//                 />
//               </div>
//               {songs.map((song, index) => (
//                 <SongInput
//                   key={`song-${index}`}
//                   song={song}
//                   handleDynamicInputValueChange={(e, index) =>
//                     handleDynamicInputValueChange(index, e)
//                   }
//                   handleRemoveSong={() => handleRemoveSong(index)}
//                 />
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={handleAddSong}
//               className="mt-8 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
//             >
//               <GoPlus size={25} className="text-white cursor-pointer" />
//               <span className="text-sm">Add another song</span>
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <div
//           aria-hidden="true"
//           className="border-t border-fuchsia-300 px-2"
//         ></div>

//         <div className="px-6 py-2">
//           <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-slate-500 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600"
//               onClick={onClose}
//             >
//               <span className="flex items-center gap-1">
//                 <span className="">Cancel</span>
//               </span>
//             </button>

//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
//             >
//               <span className="flex items-center gap-1">
//                 <span className="">Confirm</span>
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadArtist;

import React, { useState, useEffect } from "react";
import SongInput from "../input/SongInput";
import { GoPlus } from "react-icons/go";
import { createBand, updateBand } from "../../api/bands.api";

interface AlbumData {
  title: string;
  songs: { title: string; length: string }[];
  description: string;
}

interface BandData {
  _id?: string; // Add _id to BandData interface
  name: string;
  albums: AlbumData[];
}

interface UploadArtistProps {
  onClose: (event: any) => void;
  initialData?: BandData;
}

const UploadArtist = ({ onClose, initialData }: UploadArtistProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.albums[0].title || "");
  const [albumDescription, setAlbumDescription] = useState(
    initialData?.albums[0].description || ""
  );
  const [songs, setSongs] = useState(
    initialData?.albums[0].songs || [{ title: "", length: "" }]
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTitle(initialData.albums[0].title);
      setAlbumDescription(initialData.albums[0].description);
      setSongs(initialData.albums[0].songs);
    }
  }, [initialData]);

  const handleDynamicInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    const values = [...songs];
    values[index] = { ...values[index], [name]: value };
    setSongs(values);
  };

  const handleAddSong = () => {
    setSongs([...songs, { title: "", length: "" }]);
  };

  const handleRemoveSong = (index: number) => {
    const values = [...songs];
    values.splice(index, 1);
    setSongs(values);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newArtist = {
      name,
      albums: [
        {
          title,
          songs,
          description: albumDescription,
        },
      ],
    };

    try {
      if (initialData && initialData._id) {
        // Update existing artist
        await updateBand(initialData._id, newArtist);
      } else {
        // Create new artist
        await createBand(newArtist);
      }

      setName("");
      setTitle("");
      setAlbumDescription("");
      setSongs([{ title: "", length: "" }]);
      onClose(event);
    } catch (error) {
      console.error(error);
    }
    onClose(event);
  };

  return (
    <div className="w-1/3 py-2 bg-gray-100 cursor-default pointer-events-auto relative rounded-xl mx-auto shadow-lg border border-gray-200">
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
      <div className="space-y-2 p-2">
        <div className="p-4 space-y-2 text-center">
          <h2
            className="text-xl font-bold tracking-tight"
            id="page-action.heading"
          >
            {initialData ? "Edit Artist" : "Add Artist"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="w-full my-3">
                <label
                  htmlFor="artist-name"
                  className="pl-3 block text-sm text-left font-medium text-gray-700"
                >
                  Artist Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="artist-name"
                  placeholder="Name"
                  className="py-2 px-3 mt-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                />
              </div>
              <div className="w-full my-3">
                <label
                  htmlFor="album-name"
                  className="pl-3 block text-sm text-left font-medium text-gray-700"
                >
                  Album Name
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Album name"
                  type="text"
                  id="album-name"
                  className="py-2 px-3 mt-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                />
              </div>

              <div className="my-3">
                <label
                  htmlFor="album-description"
                  className="pl-3 block text-sm text-left font-medium text-gray-700"
                >
                  Album Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                  id="album-description"
                  className="mt-1 px-2 py-1 block w-full rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
                />
              </div>
              <div className="max-h-[30dvh] overflow-y-auto">
                {songs.map((song, index) => (
                  <SongInput
                    key={`song-${index}`}
                    song={song}
                    index={index}
                    handleDynamicInputValueChange={(index, e) =>
                      handleDynamicInputValueChange(e, index)
                    }
                    handleRemoveSong={() => handleRemoveSong(index)}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddSong}
              className="mt-8 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-700 focus:ring-offset-fuchsia-700"
            >
              <GoPlus size={25} className="text-white cursor-pointer" />
              <span className="text-sm">Add another song</span>
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
