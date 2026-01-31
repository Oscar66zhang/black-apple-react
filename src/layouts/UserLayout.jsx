import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFolder,
  AiOutlineShoppingCart,
  AiOutlineUsergroupDelete,
  AiOutlineSetting,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import Logo from "../assets/apple.svg?react";
import { Link } from "react-router-dom";
import DarkToggle from "../components/DarkToggle";

const UserLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "概览", icon: AiOutlineHome },
    { id: "orders", label: "订单管理", icon: AiOutlineFolder },
    { id: "shoppingCart", label: "购物车管理", icon: AiOutlineShoppingCart },
    { id: "support", label: "技术支持", icon: AiOutlineUsergroupDelete },
    { id: "settings", label: "设置", icon: AiOutlineSetting },
  ];

  return (
    <div className="h-screen flex bg-apple-white dark:bg-apple-dark">
      {/* 侧边栏 */}
      <aside
        className={`bg-apple-white dark:bg-apple-dark shadow-apple-md transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo 区域 */}
          <div className={`mb-8 ${isCollapsed ? "px-2" : "px-4"}`}>
            <div className="text-xl font-bold">
              <Link to="/">
                <Logo className="w-6 h-6 fill-apple-black dark:fill-apple-white" />
              </Link>
            </div>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center rounded-lg p-3 transition-colors
                      ${
                        activeMenu === item.id
                          ? "bg-apple-gray-900 dark:bg-apple-gray-300 text-white"
                          : "text-apple-black dark:text-apple-light hover:bg-white/5"
                      }
                      ${isCollapsed ? "justify-center" : "space-x-3"}`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* 折叠按钮 */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mt-auto p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <AiOutlineLeft className="h-5 w-5" />
            ) : (
              <AiOutlineRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {menuItems.find((item) => item.id === activeMenu)?.label}
            </h1>
          </div>
          <DarkToggle />
        </header>

        {/* 内容区域 */}
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
