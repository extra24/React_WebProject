import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // fetch대신 Axios 사용

// 커밋 데이터를 가져오는 비동기 액션
export const fetchCommits = () => async (dispatch) => {
  try {
    dispatch(fetchCommitsStart());

    // GitHub API를 통해 커밋 데이터를 가져옴
    const response = await axios.get(
      "https://api.github.com/repos/extra24/React_WebProject/commits"
    );

    // 필요한 데이터만 추출: committer date와 message
    const filteredCommits = response.data.map((commit) => ({
      date: commit.commit.committer.date,
      message: commit.commit.message,
    }));

    // 가공된 데이터를 스토어에 저장
    dispatch(fetchCommitsSuccess(filteredCommits));
  } catch (error) {
    dispatch(fetchCommitsFailure(error.message));
  }
};

// Commit List 관련 슬라이스 생성
const commitSlice = createSlice({
  name: "commits",
  initialState: {
    items: [], // Commit  목록
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommitsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommitsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload; // commit List 업데이트
    },
    fetchCommitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // 오류 메시지
    },
  },
});

// 액션 생성자, reducer 내보내기
export const { fetchCommitsStart, fetchCommitsSuccess, fetchCommitsFailure } =
  commitSlice.actions;
export default commitSlice.reducer;
