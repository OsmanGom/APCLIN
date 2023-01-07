import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
    document.getElementById('root').value = cookies.get('enterprise')
    document.getElementById('root').placeholder = cookies.get('server')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);