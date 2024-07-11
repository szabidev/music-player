import { useAppProvider } from "../../../../context/app-provider";

const Favorites = () => {
  const { favorites, setFavorites } = useAppProvider();
  console.log(favorites, "favorites");

  const clearFavorites = () => {
    setFavorites([]);
  };
  return (
    <div>
      <div className="flex mb-10">
        <h3 className="text-2xl mr-10 font-bold text-slate-500">Favorites</h3>
        <button
          onClick={clearFavorites}
          className=" inline-flex items-center justify-center font-medium rounded-lg border transition-colors outline-none min-h-[2.25rem] px-4 text-sm text-white shadow  border-transparent bg-fuchsia-500 hover:bg-fuchsia-400 "
        >
          Clear favorites
        </button>
      </div>

      <ul className="list-none">
        {favorites.map((favorite: any) => (
          <li key={favorite.song._id} className="my-3">
            <p>
              {favorite.song.artist} - {favorite.song.title}
            </p>
            <p className="text-sm text-slate-500">{favorite.song.album}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
