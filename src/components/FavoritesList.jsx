import removeIcon from "../icons/failed.png";

function FavoritesList({ favorites, listName, onRemove, onListNameChange, onSave, onViewLists }) {
  return (
    <div className="favorites-section">
      <div className="favorites-list">
        {favorites.map(movie => (
          <div key={movie.imdbID} className="fav-item">
            <span>{movie.Title}</span>
            <button onClick={() => onRemove(movie.imdbID)}><img src={removeIcon} alt="x" height="20px" /></button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={listName}
        onChange={e => onListNameChange(e.target.value)}
      />

      <button
        className={`btn-add-list ${listName.trim() ? 'active' : ''}`}
        disabled={!listName.trim()}
        onClick={onSave}
      >
        Add To Favorite List
      </button>

      <button className="btn-look" onClick={onViewLists}>
        Look At Favorite List
      </button>
    </div>
  );
}

export default FavoritesList;