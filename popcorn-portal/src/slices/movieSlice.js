import { createSlice } from "@reduxjs/toolkit";

// 영화 관련 상태와 액션을 관리할 슬라이스 생성
/* Slice의 주요 구성 요소
 * 1. 이름 : 슬라이스 이름
 * 2. 초기 상태 : 슬라이세 관련된 상태의 초기값 설정
 * 3. 리듀서 : 상태를 업데이트하는 로직을 정의하는 함수, 각각의 리듀서는 특정 액션이 발생했을 때 어떻게 상태를 변화시킬지 정의
 * 4. 액션 생성자(action creators) : 다른 컴포넌트나 비동기 작업에서 상태를 업데이트할 때 사용
 * 5. Extra Reduces : 추가 리듀서
 */
const movieSlice = createSlice({
  //1. 이름
  name: "movies",
  // 2. item, loading, error의 초기값 설정
  initialState: {
    item: [], // 영화 목록
    loading: false,
    error: null,
  },
  //3. 리듀서
  reducers: {
    //4. 액션 생성자
    fetchMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload; // 영화 목록 업데이트
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // 오류 메시지 업데이트
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } =
  movieSlice.actions;
export default movieSlice.reducer;
