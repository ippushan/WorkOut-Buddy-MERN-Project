import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Components
import NavBar from './Components/NavBar';
//Pages
import Home from './Pages/Home';



function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
