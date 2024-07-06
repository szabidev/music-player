import { useAppProvider } from "../../../context/app-provider";
import { MdFavorite } from "react-icons/md";

const Library = () => {
  const { music, albums } = useAppProvider();
  console.log(albums, "albums");
  console.log(music, "music");
  return (
    <div>
      <h3 className="text-2xl text-slate-500 font-bold mb-5">My Music</h3>
      <table className="table-auto w-full text-slate-500">
        <thead>
          <tr>
            <th className="w-2/3 text-left">Name</th>
            <th className="text-center">Streams</th>
            <th className="text-center">Listeners</th>
            <th className="text-center">Saves</th>
            <th className="text-center">Length</th>
          </tr>
        </thead>
        <tbody>
          {music.map((artist: any) =>
            artist.albums.map((album: any) =>
              album.songs.map((song: any) => (
                <tr key={song.id} className="border-t border-slate-100">
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
                  <td className="text-center">listen</td>
                  <td>
                    <div
                      className="flex justify-center items-center"
                      onClick={() => console.log("faorited")}
                    >
                      <MdFavorite size={20} />
                    </div>
                  </td>
                  <td className="text-center">{song.length}</td>
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
