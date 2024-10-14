import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //redux 스토어를 애플리케이션에 연결
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
