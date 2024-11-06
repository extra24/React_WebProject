import React from "react";
import {
  Container,
  Box,
  Paper,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Footer from "./Footer";

const Home = () => {
  //반응형으로 페이지 타이틀 나오게 수정
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 수직 중앙 정렬
          gap: 2, // 상단 제목과 이미지 리스트 간격 조절
        }}
      >
        {/* 페이지 제목 */}
        <Box
          sx={{
            maxWidth: isSmallScreen ? "90%" : "700px", // Paper와 동일한 너비
            width: "100%",
            textAlign: "left",
          }}
        >
          <Typography variant="h4" component="h2">
            Popcorn Portal
          </Typography>
        </Box>

        {/* 이미지 리스트 */}
        <Paper
          elevation={3}
          sx={{
            width: isSmallScreen ? "90%" : "700px",
            height: 800,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // 수평 중앙 정렬
              alignItems: "center", // 수직 중앙 정렬
              height: "100%", // Paper의 전체 높이 사용
            }}
          >
            <ImageList
              sx={{ width: "95%", height: "95%" }}
              cols={3}
              rowheight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </Container>
  );
};

const itemData = [
  {
    img: "/images/popcorn.jpg",
    title: "popcorn",
  },
  {
    img: "/images/popcornImg1.jpg",
    title: "popcorn1",
  },
  {
    img: "/images/popcornImg2.jpg",
    title: "popcorn2",
  },
  {
    img: "/images/popcornImg3.jpg",
    title: "popcorn3",
  },
  {
    img: "/images/popcornImg5.jpg",
    title: "popcorn5",
  },
  {
    img: "/images/popcornImg4.jpg",
    title: "popcorn4",
  },
  {
    img: "/images/popcornImg6.jpg",
    title: "popcorn6",
  },
  {
    img: "/images/popcornImg7.jpg",
    title: "popcorn7",
  },
  {
    img: "/images/popcornImg8.jpg",
    title: "popcorn8",
  },
];

export default Home;
