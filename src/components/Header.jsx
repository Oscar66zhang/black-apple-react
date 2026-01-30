// 引入 Apple Logo（SVG 作为 React 组件）
import Logo from "../assets/apple.svg?react";
// 引入图标
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
// React hooks
import { useState } from "react";
// 深色模式切换组件
import DarkToggle from "./DarkToggle";
// 路由导航
import { NavLink } from "react-router-dom";
// 顶部导航配置数据
import { SHOPPING_PAGES } from "../assets/data/path";

const Header = () => {
  // 控制移动端菜单是否打开
  const [isOpen, setIsOpen] = useState(false);
  // 控制搜索框是否显示
  const [isSearchEnable, setIsSearchEnable] = useState(false);

  return (
    // 顶部导航栏（吸顶 + 毛玻璃效果）
    <nav
      className="
        flex items-center justify-between 
        px-4 h-16 
        shadow-md sticky top-0 z-50
        bg-apple-light dark:bg-apple-dark
        backdrop-blur-md
      "
    >
      {/* Logo 区域 */}
      <a href="#" className="text-xl font-bold">
        <Logo
          className="
            w-6 h-6
            hover:scale-105 transition-transform
            dark:fill-white
          "
        />
      </a>

      {/* 桌面端导航菜单 */}
      <div
        className="
          hidden md:flex mx-auto gap-6
          text-apple-text-light
          dark:text-apple-text-dark
        "
      >
        {SHOPPING_PAGES.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            // 根据当前路由高亮导航项
            className={({ isActive }) =>
              `hover:text-apple-blue ${
                isActive
                  ? "text-apple-blue"
                  : "transition-colors"
              }`
            }
          >
            {page.title}
          </NavLink>
        ))}
      </div>

      {/* 搜索框（点击搜索图标后显示） */}
      {isSearchEnable && (
        <div className="relative">
          <input
            className="
              peer
              border border-apple-gray-200
              px-4 py-2 w-64
              rounded-lg
              focus:outline-none 
              focus:ring-apple-blue
              transition
            "
          />
          {/* 浮动标签 */}
          <label
            className="
              absolute left-2 top-2
              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:text-apple-blue
              transition
              text-apple-text-light
              dark:text-apple-text-dark
            "
          >
            搜索
          </label>
        </div>
      )}

      {/* 右侧功能按钮区域 */}
      <div
        className="
          flex items-center gap-2
          text-apple-text-light
          dark:text-apple-text-dark
        "
      >
        {/* 搜索按钮 */}
        <button onClick={() => setIsSearchEnable(!isSearchEnable)}>
          <AiOutlineSearch size={24} />
        </button>

        {/* 深色模式切换 */}
        <DarkToggle />

        {/* 移动端菜单按钮 */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={24} />
        </button>
      </div>

      {/* 移动端侧边菜单 */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 ${
          !isOpen && "hidden"
        }`}
      >
        <div
          className="
            flex flex-col space-y-6
            bg-apple-light dark:bg-apple-dark
            shadow-apple-md
            text-center p-6 rounded-lg
            text-apple-text-light
            dark:text-apple-text-dark
          "
        >
          {SHOPPING_PAGES.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                isActive
                  ? "text-apple-blue font-extrabold"
                  : "hover:text-apple-blue"
              }
            >
              {page.title}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 遮罩层（点击关闭菜单） */}
      {isOpen && (
        <div
          className="
            fixed inset-0
            bg-apple-black/50
            dark:bg-apple-white/10
            backdrop-blur-md
          "
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Header;
