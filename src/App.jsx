import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import View3 from './pages/View3';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/info">Info</Link></li>
                        <li><Link to="/view3">View 3</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/view3" element={<View3 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
