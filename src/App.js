import React from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Draw from './components/pages/Draw/Draw';
import { BrowserRouter as Rout, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/pages/Footer.js/Footer';

function App() {
  return (
    <Rout>
      <Navbar />
      <Routes>
        <Route path='/'     element={<Home />} />
        <Route path='/draw' element={<Draw />} />
      </Routes>
      <Footer />
    </Rout>
  );
}

export default App;
