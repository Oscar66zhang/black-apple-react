import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ShoppingCartProvider } from "./contexts/shoppingCart";

const App = () => {
  return(
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  )
};

export default App;
