function MovieCard({ movie, isFavorite, onAddFavorite }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/110x160'}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
        <button
          className="btn-favorite"
          disabled={isFavorite}
          onClick={() => onAddFavorite(movie)}
        >
          + Favorite
        </button>
      </div>
    </div>
  );
}

export default MovieCard;