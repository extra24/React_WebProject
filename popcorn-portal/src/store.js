import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";

//스토어 생성
const store = configureStore({
  reducer: {
    movies: movieReducer, //movies 리듀서 등록
  },
});

export default store;
