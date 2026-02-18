import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css"; // 引入 CSS 文件
import React from "react"; //引入App组件
import store from "./redux/store"; // 引入 Redux 状态管理库
import "./i18n/config";
import { Provider } from "react-redux";

const root = document.getElementById("root") ?? document.createElement("div"); // 获取 id 为 root 的 DOM 元素
const rootElement = ReactDOM.createRoot(root); // 创建一个 React 根元素
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
