import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Tabs, Tab, GlobalStyles } from "@mui/material"; //Material의 Box, Tabs, Tab 사용
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MovieIcon from "@mui/icons-material/Movie";

// Navigation 컴포넌트
const Navigation = () => {
  // 현재 url의 위치 정보
  const location = useLocation();
  const [value, setValue] = React.useState("home");

  // value에 url의 위치 정보에 따라 다르게 저장
  useEffect(() => {
    if (location.pathname === "/") {
      setValue("home");
    } else if (location.pathname === "/movies") {
      setValue("movies");
    } else if (location.pathname === "/about") {
      setValue("about");
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // navigatior ui
  return (
    <>
      {/* 전역 스타일: 네비게이터 높이만큼 상단 여백 추가 */}
      <GlobalStyles
        styles={{
          body: {
            paddingTop: "100px", // 네비게이터 높이만큼 여백 설정
          },
        }}
      />
      <Box
        sx={{
          width: "100%",
          position: "fixed", // 네비게이터를 고정된 위치에 배치
          top: 0, // 페이지 상단에 위치
          zIndex: 1000, // 다른 요소 위에 표시
          backgroundColor: "#FFF",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              color: "#590202", // 기본 탭 텍스트 색상
              margin: "0 4px", // 탭 간격 조정
              fontWeight: "bold", // 텍스트 굵기 설정
              "&:hover": {
                color: "#D90707", // 호버 시 텍스트 색상
              },
            },
            "& .Mui-selected": {
              color: "#F28C0F", // 선택된 탭의 텍스트 색상
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#F2B90F", // 인디케이터 색상 설정
              height: "3px", // 인디케이터 두께 설정
            },
          }}
          aria-label="tabs"
          centered
        >
          <Tab
            value="home"
            label="Home"
            component={Link}
            to="/"
            icon={<HomeIcon />}
          ></Tab>
          <Tab
            value="movies"
            label="Movies"
            component={Link}
            to="/movies"
            icon={<MovieIcon />}
          ></Tab>
          <Tab
            value="about"
            label="About"
            component={Link}
            to="/about"
            icon={<InfoIcon />}
          ></Tab>
        </Tabs>
      </Box>
    </>
  );
};

export default Navigation;
