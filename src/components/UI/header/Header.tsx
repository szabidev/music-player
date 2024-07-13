import { useState } from "react";
import { useAppProvider } from "../../../context/app-provider";
import Modal from "../modal/Modal";
import UploadMusic from "../../music/upload-music/UploadMusic";
import UploadArtist from "../../music/upload-artist/UploadArtist";
import { GiMusicSpell } from "react-icons/gi";

const Header = () => {
  const [showArtistModal, setShowArtistModal] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useAppProvider();

  const closeArtistModal = () => setShowArtistModal(false);
  const openArtistModal = () => setShowArtistModal(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <GiMusicSpell
          className="cursor-pointer"
          size={40}
          color="rgb(217 70 239)"
          onClick={toggleSidebar}
        />
        <h2 className="text-sm text-slate-600">Menu</h2>
      </div>
      <UploadMusic openArtistModal={openArtistModal} />
      {showArtistModal && (
        <Modal onClose={closeArtistModal}>
          <UploadArtist onClose={closeArtistModal} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
