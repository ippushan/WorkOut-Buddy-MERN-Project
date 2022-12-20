import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import NavBar from "./Components/NavBar";
import { useAuthContext } from "./hooks/useAuthContext";
//Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login'/>} />
          </Routes>
          <Routes>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/'/>} />
          </Routes>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
