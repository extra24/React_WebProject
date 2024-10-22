import React from "react";
import { Button, Divider } from "@mui/material";
import CustomDialog from "./CustomDialog";

// 기능 설명 다이얼로그
const MoreInfoDialog = () => {
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
        더 보기
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title="개발 노트"
        content={
          <div>
            <p>개발내용 테스트1</p>
            <Divider />
            <p>개발내용 테스트2</p>
          </div>
        }
      />
    </>
  );
};
export default MoreInfoDialog;
