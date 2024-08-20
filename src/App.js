// src/App.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import HeaderComponent from "./Components/HeaderComponent";
import CarouselComponent from "./Components/CarouselComponent";
import MovieListComponent from "./Components/MovieListComponent";
import MovieFilterComponent from "./Components/MovieFilterComponent";
import Spinner from "./Components/Spinner";
import debounce from "lodash.debounce";
import Message from "./Components/Message";

const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const favFromLocalStorage = JSON.parse(window.localStorage.getItem("favouriteMovies"));
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const url =
    searchVal === ""
      ? `${BASE_URL}/movie/popular`
      : `${BASE_URL}/search/movie?query=${searchVal}`;

  useEffect(() => {
    if (!favFromLocalStorage||favFromLocalStorage===null) {
      window.localStorage.setItem("favouriteMovies",JSON.stringify([]))
    }else{
      setFavouriteMovies(favFromLocalStorage);
    }
  }, []);

  const fetchMovies = async (pageNumber, url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: pageNumber,
        },
      });

      const { results, total_pages } = response.data;

      const movieData = results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average || 0,
        releaseYear: movie.release_date
          ? movie.release_date.split("-")[0]
          : "N/A",
        genre: movie.genre_ids[0], // This would be better if mapped to actual genre names
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backgroundImage: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      }));

      setMovies((prevMovies) => [...prevMovies, ...movieData]);
      setFilteredMovies((prevMovies) => [...prevMovies, ...movieData]);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page, url);
  }, [page]);

  useEffect(() => {
    setMovies([]);
    setFilteredMovies([]);
    fetchMovies(page, url);
  }, [searchVal]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        page < totalPages
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  const handleFilter = (filters) => {
    const { genre, yearRange, rating } = filters;
    console.log(rating);
    const filtered = movies.filter(
      (movie) =>
        (genre ? movie.genre === genre : true) &&
        movie.releaseYear >= yearRange[0] &&
        movie.releaseYear <= yearRange[1] &&
        movie.rating >= rating
    );
    setFilteredMovies(filtered);
  };
  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      setSearchVal(searchInput);
    }, 800), // 800ms debounce delay
    []
  );

  const handleSearch = (searchInput) => {
    debouncedSearch(searchInput);
  };

  const setFavourites = (id) => {
    if (favouriteMovies&&favouriteMovies.includes(id)) {
      const filteredFavMovies = favouriteMovies.filter((favId) => favId !== id)
      setFavouriteMovies([...filteredFavMovies]);
      window.localStorage.setItem(
        "favouriteMovies",
        JSON.stringify(filteredFavMovies)
      );
    } else {
      favouriteMovies.push(id);
      setFavouriteMovies([...favouriteMovies]);
      window.localStorage.setItem(
        "favouriteMovies",
        JSON.stringify(favouriteMovies)
      );
    }
  };

  const favMovies = movies.filter((movie) =>
    favouriteMovies.includes(movie.id)
  );

  useEffect(() => {
    console.log(favouriteMovies)
  }, [favouriteMovies]);

  return (
    <div>
      <HeaderComponent onSearch={handleSearch} />
      {movies.length === 0 && (
        <Message variant="danger">No Movies Found</Message>
      )}
      {movies.length !== 0 && (
        <>
          <CarouselComponent
            movies={favMovies.length > 2 ? favMovies : movies}
          />
          <MovieFilterComponent onFilter={handleFilter} />
          <MovieListComponent
            movies={filteredMovies}
            setFavourites={setFavourites}
            favouriteMovies={favouriteMovies}
          />
        </>
      )}

      {loading && <Spinner />}
    </div>
  );
};

export default App;
