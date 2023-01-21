import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import { Route, Routes, Navigate } from "react-router-dom";
import {Login,Signup} from "./components/Auth/index.js";

// import { useState } from "react";

const App = () => {
  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
     
      <Route  path='/login' element={<Login />} />
      <Route  path='/signup' element={<Signup />} />
        {/* <Route path="/:login" element={<AuthIndex />} />
        <Route path="/:signup" element={<AuthIndex />} /> */}
        <Route path="/404" element={<h1>404 Not Found</h1>}></Route>
        <Route path="/:category?" element={<Products />}></Route>
        
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
