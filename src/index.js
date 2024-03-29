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
import NotificationPage from './pages/notifications';
import MessagePage from './pages/messages';
import DonatePage from './pages/donate';
import TipsPage from './pages/tips';
import SportPage from './pages/sport';
import AboutUsPge from './pages/about-us';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfUsePage from './pages/terms-of-use';
import DisclaimerPage from './pages/disclaimer';

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
        <Route path='/notifications' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}/>
        <Route path='/messages' element={<ProtectedRoute><MessagePage/></ProtectedRoute>}/>
        <Route path='/donate' element={<DonatePage/>}/>
        <Route path='/tips' element={<TipsPage/>} />
        <Route path='/sports' element={<SportPage/>}/>
        <Route path='/about-us' element={<AboutUsPge/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
        <Route path='/terms-of-use' element={<TermsOfUsePage/>}/>
        <Route path='/disclaimer' element={<DisclaimerPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
