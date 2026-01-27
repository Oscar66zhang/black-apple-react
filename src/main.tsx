import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css"; // 引入 CSS 文件
import React from "react";
import {BrowserRouter} from "react-router-dom";

const root = document.getElementById("root") ?? document.createElement("div"); // 获取 id 为 root 的 DOM 元素
const rootElement = ReactDOM.createRoot(root); // 创建一个 React 根元素
rootElement.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
); 
