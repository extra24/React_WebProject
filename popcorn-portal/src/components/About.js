import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid2,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Footer from "./Footer";

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2, // 카드 간 간격 설정
        }}
      >
        {/* 프로젝트 소개 섹션 */}
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            sx={{ height: 300 }}
            image="/images/popcornImg5.jpg"
            title="popcornMainImg"
          />
          <CardContent>
            <Typography
              sx={{ color: "text.secondary", fontSize: 14 }}
              gutterBottom
            >
              Project Introduction
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              프로젝트 소개
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              이 웹사이트는 사용자가 다양한 영화 정보를 검색하고 탐색할 수 있는
              플랫폼입니다. 최신 영화, 평점, 리뷰 등을 쉽게 찾아볼 수 있도록
              도와줍니다.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">기능 설명</Button>
            <Button size="small">사용된 오픈소스</Button>
          </CardActions>
        </Card>

        {/* 미래 계획 섹션 */}
        <Card sx={{ maxWidth: 700 }}>
          <CardContent>
            <Typography
              sx={{ color: "text.secondary", fontSize: 14 }}
              gutterBottom
            >
              Development Notes
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              개발 노트
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              향후 사용자 피드백을 반영하여 더 많은 기능을 추가할 계획입니다.
              사용자 맞춤형 추천 시스템 및 다양한 필터링 옵션을 도입할
              예정입니다.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">더 보기</Button>
          </CardActions>
        </Card>
      </Box>
      <Footer />
    </Container>
  );
};

export default About;
