import React from "react";
import { Container, Box, Paper, ImageList, ImageListItem } from "@mui/material";
import Footer from "./Footer";

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // 수평 중앙 정렬
          alignItems: "center", // 수직 중앙 정렬
        }}
      >
        <Paper
          elevation={3}
          sx={{ width: 700, height: 800, overflow: "hidden" }}
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
              sx={{ width: 650, height: 750 }}
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
