import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CustomDialog from "./CustomDialog";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// 기능 설명 다이얼로그
const OpenSourceDialog = () => {
  const [open, setOpen] = React.useState(false);

  // 다이얼로그 열고 닫기 handler
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 사용된 오픈소스 목록
  const opensourceList = [
    "Create React App",
    "React Router",
    "Redux",
    "Material-UI",
    "Axios",
  ];

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        사용된 오픈소스
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title="사용된 오픈소스"
        content={
          <List>
            {opensourceList.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: "small" }} />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        }
      />
    </>
  );
};
export default OpenSourceDialog;
