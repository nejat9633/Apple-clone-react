import React, { useState } from "react";
import "./css/styles.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./components/MainComponents/MainSection";
import {Routes, Route} from 'react-router-dom'
import NotFound from "./components/MainComponents/NotFound";
import SharedLayout from "./components/SharedLayout";
import Iphone from "./components/MainComponents/Iphones/Iphone";
import IphoneDetail from "./components/MainComponents/Iphones/IphoneDetail";


function App() {

  return (
    <>

      <Routes >
        <Route path="/" element={<SharedLayout/>}>
 <Route path="/" element={<MainSection />} />
        <Route path="/mac" element={<>Mac</>} />
        <Route path="/iphone" element={<Iphone/>} />
        <Route path="/ipad" element={<>ipad</>} />
        <Route path="/watch" element={<>watch</>} />
        <Route path="/tv" element={<>Tv</>} />
        <Route path="/music" element={<>Music</>} />
        <Route path="/support" element={<>Support</>} />
        <Route path="/support" element={<>Support</>} />
        <Route path="*" element={<NotFound/>} />
<Route path="/iphone/:id" element={<IphoneDetail/>}/>
        </Route>
       
      </Routes>
    </>
  );
}

export default App;
