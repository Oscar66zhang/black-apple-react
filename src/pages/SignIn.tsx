import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApiData from "@/hooks/useApiData";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState, StoreDispach } from "../redux/store";
import { login } from "../redux/userSlice";

function SignIn() {
  const dispatch = useDispatch<StoreDispach>();
  const { token, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username: email, password }));
  };

  useEffect(() => {
    if (loading) return;
    if (!loading && error) alert(error);
    if (!loading && token) {
      localStorage.setItem("token", token);
      navigate(location.state?.from || "/");
    }
  }, [token, error, loading]);

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* 毛玻璃效果背景 */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10" />

        {/* 登录表单容器 */}
        <div className="relative z-10 p-12">
          {/* Apple 风格 Logo */}
          <div className="flex justify-center mb-8">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 表单标题 */}
          <h1 className="text-3xl font-semibold text-center text-white mb-8">
            欢迎回来
          </h1>

          {/* 登录表单 */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:border-white focus:ring-2 focus:ring-white/40 text-white placeholder-gray-400 transition-all duration-200"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:border-white focus:ring-2 focus:ring-white/40 text-white placeholder-gray-400 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 hover:bg-white/40 hover:border-white/50 active:scale-95 text-white font-medium transition-all duration-200"
            >
              登录
            </button>
          </form>

          {/* 辅助链接 */}
          <div className="mt-8 flex justify-between text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              创建账户
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              忘记密码?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
