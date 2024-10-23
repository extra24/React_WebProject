import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux 사용
import { fetchCommits } from "../../slices/commitSlice";
import {
  Button,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CustomDialog from "./CustomDialog";

// 기능 설명 다이얼로그
const MoreInfoDialog = () => {
  // 데이터 전달
  const dispatch = useDispatch();
  const {
    items: commits,
    loading,
    error,
  } = useSelector((state) => state.commits);

  // 버튼 클릭시 다이얼로그 open state
  const [open, setOpen] = React.useState(false);

  // 다이얼로그 열고 닫기 handler
  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchCommits()); // 버튼 클릭 시에만 데이터 가져오기
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
        title="개발 내역 상세"
        content={
          <div>
            {loading && <CircularProgress />}
            {error && <div>Error: {error}</div>}
            {commits && commits.length > 0 ? (
              <List>
                {commits.map((commit, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={commit.message}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            Date: {new Date(commit.date).toLocaleString()}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            ) : (
              !loading && <div>개발 내역이 없습니다.</div>
            )}
          </div>
        }
      />
    </>
  );
};
export default MoreInfoDialog;
