import { useState } from "react";
import Modal from "../modal/Modal";
import UploadMusic from "../music/upload-music/UploadMusic";
import UploadArtist from "../upload-artist/UploadArtist";

const Header = () => {
  const [showArtistModal, setShowArtistModal] = useState<boolean>(false);
  // const [showSongModal, setShowSongModal] = useState<boolean>(false);

  const closeArtistModal = () => setShowArtistModal(false);
  const openArtistModal = () => setShowArtistModal(true);
  // const closeSongModal = () => setShowSongModal(false);
  // const openSongModal = () => setShowSongModal(true);
  return (
    <div className="w-full flex justify-end">
      {/* <SearchForm /> */}
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
