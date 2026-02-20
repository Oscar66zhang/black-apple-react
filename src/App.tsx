import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ShoppingCartProvider } from "./contexts/shoppingCart";
import AppInit from "./AppInit";

const App = () => {
  return (
    <ShoppingCartProvider>
      <AppInit />
      {/* 用于程序初始化，如:设置token */}
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
};

export default App;
