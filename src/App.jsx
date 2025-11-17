import React, { useState } from "react";
import "./css/styles.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./components/MainComponents/MainSection";

function App() {
  return (
    <>
      <Header />
      <MainSection />
      <Footer />
    </>
  );
}

export default App;
