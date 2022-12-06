import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Menu from './components/Menu';
import mapIMG from "./img/ИРИТ РТФ 1 этаж.jpg"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Menu />
    <App mapImg={mapIMG} />
  </>
);
