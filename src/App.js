import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import Header from './Header';
import SideBar from './SideNav';
import Footer from './Footer';
import Home from './components/Home';
import TechnicalSpecifications from './components/TechnicalSpecifications';
import NotFound from './components/NotFound';
import DataManipulation from './components/DataManipulation';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-container">
          <SideBar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technical-specifications" element={<TechnicalSpecifications />} />
              <Route path="/data-manipulation" element={<DataManipulation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
