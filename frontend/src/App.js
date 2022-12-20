import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import NavBar from "./Components/NavBar";
//Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
