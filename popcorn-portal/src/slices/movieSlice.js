import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // fetch대신 Axios 사용

// 비동기 액션 : 영화 목록과 감정/분위기 예측을 포함한 데이터 가져오기
export const fetchMovies = createAsyncThunk(
  "movies/fetchMoviesAndEmotion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/movies"); // 서버에서 만든 API 앤드포인트
      return response.data; // 서버에서 반환된 영화 및 감정 예측 데이터
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch movies and emotion data"
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    items: [], // 영화 목록과 감정 예측 결과
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // 영화 목록과 감정 예측 결과 저장
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 리듀서 내보내기
export default movieSlice.reducer;

// // 비동기 액션 : 영화 목록 가져오기
// export const fetchMovies = createAsyncThunk(
//   "movies/fetchMovies",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
//       );
//       return response.data.data.movies; // 영화 목록 반환
//     } catch (error) {
//       // 에러가 발생했을 때 rejectWithValue를 통해 에러 메시지 반환
//       return rejectWithValue(error.response?.data?.message || "Wrong Message");
//     }
//   }
// );

// 영화 관련 상태와 액션을 관리할 슬라이스 생성
/* Slice의 주요 구성 요소
 * 1. 이름 : 슬라이스 이름
 * 2. 초기 상태 : 슬라이세 관련된 상태의 초기값 설정
 * 3. 리듀서 : 상태를 업데이트하는 로직을 정의하는 함수, 각각의 리듀서는 특정 액션이 발생했을 때 어떻게 상태를 변화시킬지 정의
 * 4. 액션 생성자(action creators) : 다른 컴포넌트나 비동기 작업에서 상태를 업데이트할 때 사용
 * 5. Extra Reducers : 추가 리듀서로 비동기 액션의 pending, fulfilled, rejected 상태에 따ㅏ 상태 업데이트

// 이전 내용
const movieSlice = createSlice({
  //1. 이름
  name: "movies",
  // 2. item, loading, error의 초기값 설정
  initialState: {
    items: [], // 영화 목록과 감정 예측 결과
    loading: false,
    error: null,
    emotionResult: null, // 감정 예측 결과
    emotionLoading: false, // 감정 예측 요청 상태
    emotionError: null, // 감정 예측 에러
    features: null, // 이미지 특성 저장
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
      state.items = action.payload; // 영화 목록 업데이트
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // 오류 메시지 업데이트
    },
  },
  //5. Extra Reducer
  extraReducers: (builder) => {
    builder
      // 영화 목록 로드
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 감정 예측 로드
      .addCase(fetchEmotion.pending, (state) => {
        state.emotionLoading = true;
        state.emotionError = null;
      })
      .addCase(fetchEmotion.fulfilled, (state, action) => {
        state.loading = false;
        state.emotionResult = action.payload.predictedEmotion; // 감정 예측 결과 저장
        state.features = action.payload.features; // 특성 결과 저장
      })
      .addCase(fetchEmotion.rejected, (state, action) => {
        state.emotionLoading = false;
        state.emotionError = action.payload;
      });
  },
});
 */
