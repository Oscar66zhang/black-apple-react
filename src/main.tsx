import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css"; // 引入 CSS 文件

const root = document.getElementById("root") ?? document.createElement("div"); // 获取 id 为 root 的 DOM 元素
const rootElement = ReactDOM.createRoot(root); // 创建一个 React 根元素
rootElement.render(<App />); // 渲染 App 组件到根元素
