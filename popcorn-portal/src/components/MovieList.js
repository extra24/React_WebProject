import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux 사용
import { fetchMovies } from "../slices/movieSlice";
import Movies from "./Movies";
import { experimentalStyled as styled } from "@mui/material/styles"; // Material styles 사용
import { Box, Paper, Grid2 } from "@mui/material"; // Material-UI Box, Paper, Grid2 사용

const MovieList = () => {
  // 데이터 전달
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // 리스트 Style 설정
  const Boxes = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFF",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
    height: "500px", // 고정 높이 설정
    display: "flex", // flexbox 레이아웃 설정
    flexDirection: "column", // 세로로 정렬
    justifyContent: "flex-start", // 시작점에서 정렬
  }));

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex", // 추가된 부분
        justifyContent: "center", // 추가된 부분
        alignItems: "center", // 추가된 부분
        marginTop: "50px",
      }}
    >
      <Grid2 container spacing={2} columns={16} justifyContent="center">
        {items.map((movie) => (
          <Grid2 xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Boxes sx={{ width: "100%", maxWidth: "250px" }}>
              {/** 각 영화 정보를 보여주는 Movies 컴포넌트 */}
              <Movies
                key={movie.id} // React 내 고유 key
                id={movie.id} // 컴포넌트에서 사용할 Id값
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            </Boxes>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default MovieList;
