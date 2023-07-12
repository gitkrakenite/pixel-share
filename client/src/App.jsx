import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
import Auth from "./pages/Auth/Auth";
import Lost from "./pages/Lost";
import Profile from "./pages/Profile/Profile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Lost />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
