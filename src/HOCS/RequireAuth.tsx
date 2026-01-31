import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation(); //拿到当前页面的地址
  const token = localStorage.getItem("token"); //拿到Token
  if (!token) {
    /* 检查用户是否已登录（通过检查 localStorage 中的 token），如果未登录，则重定向到登录页；
  如果已登录，则允许访问子组件（受保护的内容）。 */
    return (
      <Navigate
        to="/auth/signin" // 重定向到登录页
        state={{ from: location.pathname }} // 传递当前页面路径
        replace // 替换历史记录
      />
    );
  }
  // 如果有 token（用户已登录），渲染子组件
  return children;
};

export default RequireAuth;
