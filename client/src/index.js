import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Layout.js';
import App from './components/App/App.js'
import Test from './components/Test/Test.js';
import "./css/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/make-graph" element={<App />} />
            <Route exact path="/test-graph" element={<Test />} />
        </Routes>
    </BrowserRouter>
);
