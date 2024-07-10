import { FaPlus } from "react-icons/fa6";

const UploadMusic = ({ openArtistModal }: { openArtistModal: any }) => {
  return (
    <div>
      <button
        onClick={openArtistModal}
        className="btn ml-20 bg-gray-100 hover:bg-fuchsia-300 w-fit px-3 py-1 rounded-2xl flex justify-center items-center transition ease-in duration-200"
      >
        <FaPlus size={20} className="mr-2" />
        <span>Upload Music</span>
      </button>
    </div>
  );
};

export default UploadMusic;
