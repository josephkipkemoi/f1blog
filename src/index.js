import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/contact';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ArticlePage from './pages/article';
import AdminPage from './pages/admin';
import { ProtectedRoute } from './hooks/protectedRoute';
import ProfilePage from './pages/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/articles/:article_id' element={<ArticlePage />} />
        <Route path='/contact-us' element={<ContactPage />} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
