import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Request.With'] = 'XMLHttpRequest';

let token = localStorage.getItem('token');

if(token){
  console.log(`Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else{
  delete axios.defaults.headers.common['Authorization'];
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);