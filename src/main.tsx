import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Elders from './pages/Elders';
import Tasks from './pages/Tasks';
import './index.css';  // Add this line!

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Navigate to='/elders' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='elders' element={<Elders />} />
          <Route path='tasks' element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);