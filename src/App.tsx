import { useEffect, useState } from "react";
import Search from "./components/Search";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import { API_BASE_URL, API_KEY } from "./apis/constants";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import TrendingMovieCard from "./components/TrendingMovieCard";
import MyPagination from "./components/MyPagination";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [movies, setMovies] = useState<any[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchMovies = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query.trim()
          )}`
        : `${API_BASE_URL}/discover/movie?page=${currentPage}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();

      setMovies(result.results);

      if (searchTerm && result.results.length > 0) {
        updateSearchCount(searchTerm, result.results[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      if (!movies || movies.length === 0) {
        throw new Error("Something went wrong");
      }

      setTrendingMovies(movies);

      // console.log("trending movies", movies);
    } catch (error) {
      console.log(`Error Fetching TrendingMovies ${error}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm, currentPage]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2 className="text-center">Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <TrendingMovieCard
                  movie={movie}
                  index={index}
                  key={movie.$id}
                />
              ))}
            </ul>
          </section>
        )}

        {!searchTerm && (
          <MyPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <section className="all-movies">
          <h2 className="text-center mt-[40px] ">
            {searchTerm ? (
              <>
                Search Results for{" "}
                <span className="text-gradient">{searchTerm}</span> ?
              </>
            ) : (
              "Discover Popular Movies"
            )}
          </h2>
          {isLoading && <Loader />}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {!isLoading && !errorMessage && movies.length > 0 && (
            <ul>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>
          )}
        </section>
        {!searchTerm && (
          <MyPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}

export default App;
