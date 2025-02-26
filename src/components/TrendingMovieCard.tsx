const TrendingMovieCard = ({ movie, index }: any) => {
  return (
    <li key={movie.id}>
      <p>{index + 1}</p>
      <img src={movie.poster_url} alt="trending-poster" />
    </li>
  );
};

export default TrendingMovieCard;
