import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux 사용
import { fetchMovies } from "../slices/movieSlice";
import Movies from "./Movies";
import { Box } from "@mui/material"; // Material-UI Box 사용

const MovieList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>팝콘 Movie List</h1>
      {items.map((movie) => (
        <Movies
          key={movie.id} // React 내 고유 key
          id={movie.id} // 컴포넌트에서 사용할 Id값
          coverImg={movie.medium_cover_image}
          title={movie.title}
          summary={movie.summary}
          genres={movie.genres}
        />
      ))}
    </div>
  );
};

export default MovieList;
