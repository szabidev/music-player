import { MdDeleteForever } from "react-icons/md";

interface SongInputProps {
  handleDynamicInputValueChange: (index: number, event: any) => void;
  handleRemoveSong: (index: number) => void;
  song: { title: string; length: string };
  index: number;
}

const SongInput = ({
  handleDynamicInputValueChange,
  handleRemoveSong,
  song,
  index,
}: SongInputProps) => {
  return (
    <div className="w-full flex justify-between my-2 items-center">
      <div>
        <label
          htmlFor={`song-title-${index}`}
          className="pl-3 block text-sm text-left font-medium text-gray-700"
        >
          Song
        </label>
        <input
          type="text"
          name="title"
          id={`song-title-${index}`}
          value={song.title}
          onChange={(event) => handleDynamicInputValueChange(index, event)}
          placeholder="Add a song"
          className="py-2 px-3 min-w-[250px] mt-1 block rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
        />
      </div>
      <div className="">
        <label
          htmlFor={`song-length-${index}`}
          className="pl-3 block text-sm text-left font-medium text-gray-700"
        >
          Time
        </label>
        <input
          type="text"
          name="length"
          id={`song-length-${index}`}
          value={song.length}
          onChange={(event) => handleDynamicInputValueChange(index, event)}
          placeholder="Minutes"
          className="py-2 px-3 min-w-[250px] mt-1 block rounded-lg outline-none border-gray-300 shadow-sm focus:border-fuchsia-400 focus:ring focus:ring-fuchsia-400 focus:ring-opacity-50"
        />
      </div>
      <MdDeleteForever
        size={25}
        onClick={() => handleRemoveSong(index)}
        className="ml-2 text-slate-600 mt-4 cursor-pointer hover:text-fuchsia-400 transition ease-in duration-200"
      />
    </div>
  );
};

export default SongInput;
