import React from "react";
import { Box, Typography } from "@mui/material";

//Footer 컴포넌트
const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4, // 페이지 내용과의 여백
        py: 2, // 상하 패딩
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; Kim Aram {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Contact Me : 6aram@naver.com
      </Typography>
    </Box>
  );
};

export default Footer;
