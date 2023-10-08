import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import GalleryProvider from "./providers/GalleryProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GalleryProvider>
            <App />
          </GalleryProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


