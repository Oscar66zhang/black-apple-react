import React from "react";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Computers from "./pages/Computers";
import IPad from "./pages/Ipad";
import Phones from "./pages/Phones";
import Entertainment from "./pages/Entertainment";
import Support from "./pages/Support";
import SmartHome from "./pages/SmartHome";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            header={<Header />}
            content={<Home />}
            footer={<Footer />}
          />
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/computers" element={<Computers />} />
      <Route path="/ipad" element={<IPad />} />
      <Route path="/entertainment" element={<Entertainment />} />
      <Route path="/support" element={<Support />} />
      <Route path="/smarthome" element={<SmartHome />} />
      <Route path="/phones" element={<Phones />} />
    </Routes>
  );
};

export default App;
