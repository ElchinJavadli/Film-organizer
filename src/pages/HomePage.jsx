import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import FavoritesList from "../components/FavoritesList";

const API_KEY = "7fe0435d";

function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=movie&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
      });
  }, []);

  function handleSearch() {
    if (!query.trim()) return;
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
      });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function addToFavorites(movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  function removeFromFavorites(imdbID) {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  }

  async function saveList() {
    if (!listName.trim() || favorites.length === 0) return;

    const existing = JSON.parse(localStorage.getItem("favLists") || "[]");
    existing.push({
      id: Date.now(),
      title: listName,
      movies: favorites,
    });
    localStorage.setItem("favLists", JSON.stringify(existing));

    setFavorites([]);
    setListName("");
  }

  return (
    <div>
      <header>
        <h1>Movie</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="main-content">
        <div className="movies-section">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.some((f) => f.imdbID === movie.imdbID)}
              onAddFavorite={addToFavorites}
            />
          ))}
        </div>

        <FavoritesList
          favorites={favorites}
          listName={listName}
          onRemove={removeFromFavorites}
          onListNameChange={setListName}
          onSave={saveList}
          onViewLists={() => navigate("/favorites")}
        />
      </div>
    </div>
  );
}

export default HomePage;
