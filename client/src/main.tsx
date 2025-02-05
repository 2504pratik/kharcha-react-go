import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './sections/LoginPage.tsx';

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </StrictMode>
);