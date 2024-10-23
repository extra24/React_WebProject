import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import commitReducer from "./slices/commitSlice";

//스토어 생성
const store = configureStore({
  reducer: {
    movies: movieReducer, // movies 리듀서 등록
    commits: commitReducer, // commits 리듀서 등록
  },
});

export default store;
