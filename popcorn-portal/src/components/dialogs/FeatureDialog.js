import React from "react";
import { Button } from "@mui/material";
import CustomDialog from "./CustomDialog";

// 기능 설명 다이얼로그
const FeatureDialog = () => {
  const [open, setOpen] = React.useState(false);

  // 다이얼로그 열고 닫기 handler
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        기능 설명
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title="기능 설명"
        content={
          <div>
            <p>
              이 웹사이트는 사용자가 다양한 영화 정보를 검색하고 탐색할 수 있는
              플랫폼입니다.
              <br /> 주요 기능은 검색, 필터링, 개인화된 추천 등을 포함합니다.
            </p>
          </div>
        }
      />
    </>
  );
};
export default FeatureDialog;
