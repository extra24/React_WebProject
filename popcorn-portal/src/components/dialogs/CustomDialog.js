import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const CustomDialog = ({ open, onClose, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableScrollLock // 배경 스크롤 잠금 방지
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Typography variant="body2">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
