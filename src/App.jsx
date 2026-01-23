import React from "react";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const App = () => {
  return (
    <MainLayout header={<Header />} content={<Home />} footer={<Footer />} />
  );
};

export default App;
