import { RouterProvider } from "react-router-dom";
import router from "./routes";
// import About from "./pages/About";
// import Computers from "./pages/Computers";
// import IPad from "./pages/Ipad";
// import Phones from "./pages/Phones";
// import Entertainment from "./pages/Entertainment";
// import Support from "./pages/Support";
// import SmartHome from "./pages/SmartHome";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
