import { useEffect, useState } from "react";
import useApiData from "@/hooks/useApiData";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const { data, loading, error, fetchData } = useApiData(
    "http://152.136.182.210:12231/api/auth/register",
    {
      method: "POST",
      autoFetch: false,
    },
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("两次密码输入不一致");
      return;
    }

    const body = {
      username: email,
      password,
      confirmPassword,
    };

    await fetchData({ overrideBody: body });
  };

  useEffect(() => {
    if (loading) return;
    if (!loading && error) alert(error);
    if (!loading && data) navigate("/auth/signin");
  }, [loading, error, data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* 毛玻璃背景 */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10" />

        {/* 注册表单容器 */}
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
            创建新账户
          </h1>

          {/* 注册表单 */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:border-white focus:ring-2 focus:ring-white/40 text-white placeholder-gray-400 transition-all duration-200"
                placeholder="yourname"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                确认密码
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:border-white focus:ring-2 focus:ring-white/40 text-white placeholder-gray-400 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 hover:bg-white/40 hover:border-white/50 active:scale-95 text-white font-medium transition-all duration-200"
            >
              注册
            </button>
          </form>

          {/* 辅助链接 */}
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">已经有账户了？</span>{" "}
            <a
              href="#"
              className="text-white underline hover:text-gray-300 transition-colors duration-200"
            >
              去登录
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
