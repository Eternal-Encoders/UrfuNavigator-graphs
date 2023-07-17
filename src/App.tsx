import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/home-page/HomePage';
import DrawInst from './pages/draw-inst/DrawInst';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/drawinst' element={<DrawInst />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
