import { useState } from "react";
import Modal from "../modal/Modal";
import UploadMusic from "../../music/upload-music/UploadMusic";
import UploadArtist from "../../upload-artist/UploadArtist";
import { GiMusicSpell } from "react-icons/gi";
import { useAppProvider } from "../../../context/app-provider";

const Header = () => {
  const [showArtistModal, setShowArtistModal] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useAppProvider();

  const closeArtistModal = () => setShowArtistModal(false);
  const openArtistModal = () => setShowArtistModal(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full flex justify-between items-center">
      <GiMusicSpell
        className="cursor-pointer"
        size={40}
        color="rgb(217 70 239)"
        onClick={toggleSidebar}
      />
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
