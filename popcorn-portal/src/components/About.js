import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Footer from "./Footer";
import FeatureDialog from "./dialogs/FeatureDialog"; // 기능 설명 다이얼로그
import OpenSourceDialog from "./dialogs/OpenSourceDialog"; // 오픈 소스 다이얼로그
import MoreInfoDialog from "./dialogs/MoreInfoDialog"; // 개발 노트 더 보기 다이얼로그

const About = () => {
  //반응형으로 페이지 타이틀 나오게 수정
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box
          sx={{
            maxWidth: isSmallScreen ? "90%" : "700px", // Card와 동일한 너비
            width: "100%", // 부모 요소의 크기에 맞춤
            textAlign: "left",
          }}
        >
          <Typography variant="h4" component="h2">
            About
          </Typography>
        </Box>
        {/* 프로젝트 소개 섹션 */}
        <Card sx={{ maxWidth: isSmallScreen ? "90%" : "700px" }}>
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
            <FeatureDialog />
            <OpenSourceDialog />
          </CardActions>
        </Card>
        {/* 미래 계획 섹션 */}
        <Card sx={{ maxWidth: isSmallScreen ? "90%" : "700px" }}>
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
            <MoreInfoDialog />
          </CardActions>
        </Card>
      </Box>
      <Footer />
    </Container>
  );
};

export default About;
