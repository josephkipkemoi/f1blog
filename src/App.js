import { useEffect, useState } from 'react';
import './App.css';
import FooterComponent from './components/footer';
import HeaderComponent from './components/header';

import BlogPage from './pages/blogs';

function App() {
  return (
    <div>
          <HeaderComponent/>
          <BlogPage/>
          <FooterComponent/>
    </div>
  );
}

export default App;
