import React from "react";
import { Box, Typography, Divider } from "@mui/material";

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
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          &copy; Kim Aram {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact Me : extra24@email.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
