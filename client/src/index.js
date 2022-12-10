import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Layout.js';
import App from './components/App/App.js'
import Test from './components/Test/Test.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-graph" element={<App />} />
            <Route path="/test-graph" element={<Test />} />
        </Routes>
    </BrowserRouter>
);
