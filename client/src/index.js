import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './components/Layout.js';
import App from './components/App/App.js'
import MakeInstitute from './components/Inst/MakeInstitute.js';
import "./css/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-graph" element={<App />} />
            <Route path="/make-inst" element={<MakeInstitute />} />
        </Routes>
    </HashRouter>
);
