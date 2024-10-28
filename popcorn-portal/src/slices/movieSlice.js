import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // fetch대신 Axios 사용

// 비동기 액션
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      );
      return response.data.data.movies; // 영화 목록 반환
    } catch (error) {
      // 에러가 발생했을 때 rejectWithValue를 통해 에러 메시지 반환
      return rejectWithValue(error.response?.data?.message || "Wrong Message");
    }
  }
);

// 영화 포스터를 서버로 전송하여 감정 예측 결과를 받아오는 비동기 액션
export const fetchEmotion = createAsyncThunk(
  "movies/fetchEmotion",
  async (imgFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", imgFile);

      const response = await axios.post(
        "http://localhost:5000/predict", // API 앤드포인트
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // 서버에서 반환된 이미지 특성 및 감정/분위기 예측 결과
      return {
        features: response.data.features,
        predictedEmotion: response.data.predicted_emotion,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Emotion prediction failled"
      );
    }
  }
);

// 영화 관련 상태와 액션을 관리할 슬라이스 생성
/* Slice의 주요 구성 요소
 * 1. 이름 : 슬라이스 이름
 * 2. 초기 상태 : 슬라이세 관련된 상태의 초기값 설정
 * 3. 리듀서 : 상태를 업데이트하는 로직을 정의하는 함수, 각각의 리듀서는 특정 액션이 발생했을 때 어떻게 상태를 변화시킬지 정의
 * 4. 액션 생성자(action creators) : 다른 컴포넌트나 비동기 작업에서 상태를 업데이트할 때 사용
 * 5. Extra Reducers : 추가 리듀서
 */
const movieSlice = createSlice({
  //1. 이름
  name: "movies",
  // 2. item, loading, error의 초기값 설정
  initialState: {
    items: [], // 영화 목록
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

// 액션 생성자와 리듀서 내보내기
export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } =
  movieSlice.actions;
export default movieSlice.reducer;
