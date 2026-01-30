import { useNavigate, useLocation } from "react-router-dom";
const Computers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <h1>Computers</h1>
      <p>This is the Computers page.</p>
      <button onClick={() => navigate(-1)}>返回上一页</button>
      <button
        onClick={() =>
          navigate("/auth/signin", {
            state: { from: location.pathname }, //携带当前路径作为 “来源页”
            replace: true,
          })
        }
      >
        登陆
      </button>
    </div>
  );
};
export default Computers;
