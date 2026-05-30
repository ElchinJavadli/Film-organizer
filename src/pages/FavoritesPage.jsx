import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import removedIcon from "../icons/failed.png";

function FavoritesPage() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favLists') || '[]');
    setLists(saved);
  }, []);

  function removeList(id) {
    const updated = lists.filter(l => l.id !== id);
    setLists(updated);
    localStorage.setItem('favLists', JSON.stringify(updated));
  }

  return (
    <div>
      <header>
        <h1>Movie</h1>
      </header>

      <div className="fav-page">
        {lists.length === 0 && <p>No lists saved yet.</p>}

        {lists.map(list => (
          <div key={list.id} className="list-card">
            <h2>{list.title}</h2>

            {list.movies.map(movie => (
              <div key={movie.imdbID} className="list-movie-item">
                <span>{movie.Title}</span>
                <button
                  className="btn-imdb"
                  onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank')}
                >
                  IMDB
                </button>
              </div>
            ))}

            <button className="btn-remove-list" onClick={() => removeList(list.id)}>
              <img src={removedIcon} alt="Remove" width="30"/>
            </button>
          </div>
        ))}

        <button className="btn-back" onClick={() => navigate('/')}>Movies</button>
      </div>
    </div>
  );
}

export default FavoritesPage;