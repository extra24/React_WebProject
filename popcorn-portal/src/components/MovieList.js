import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux 사용
import { fetchMovies, fetchEmotion } from "../slices/movieSlice"; // movieList, 감정 예측 액션
import Movies from "./Movies";
import { experimentalStyled as styled } from "@mui/material/styles"; // Material styles 사용
import {
  Container,
  Box,
  Paper,
  Grid2,
  CircularProgress,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"; // Material-UI Box, Paper, Grid2 사용
import Footer from "./Footer";

const MovieList = () => {
  //반응형으로 페이지 타이틀 나오게 수정
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // 데이터 전달
  const dispatch = useDispatch();
  const { items, loading, error, emotionResult, emotionLoading } = useSelector(
    (state) => state.movies
  );

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
    width: "250px",
  }));

  // 감정/분위기 예측 요청 핸들러
  const handleEmotionPrediction = (movie) => {
    const imgFile = new File([], movie.medium_cover_image); // 이미지 경로를 파일 객체로 변환
    dispatch(fetchEmotion(imgFile));
  };

  if (loading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: isSmallScreen ? "90%" : "875px", // Box와 동일한 너비
            width: "100%", // 부모 요소의 크기에 맞춤
            textAlign: "left",
          }}
        >
          <Typography variant="h4" component="h2">
            Movie List
          </Typography>
        </Box>
        <Grid2 container spacing={2} columns={16} justifyContent="center">
          {items.map((movie) => (
            <Grid2 xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Boxes>
                {/** 각 영화 정보를 보여주는 Movies 컴포넌트 */}
                <Movies
                  key={movie.id} // React 내 고유 key
                  id={movie.id} // 컴포넌트에서 사용할 Id값
                  coverImg={movie.medium_cover_image}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEmotionPrediction(movie)}
                  sx={{ mt: 2 }}
                  disabled={emotionLoading} // 감정 예측 로딩 중에는 버튼 비활성화
                >
                  predict emotion
                </Button>
                {emotionResult && (
                  <Box sx={{ mt: 2 }}>
                    <h4>#</h4>
                    <p>{emotionResult}</p>
                  </Box>
                )}
              </Boxes>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Footer />
    </Container>
  );
};

export default MovieList;
