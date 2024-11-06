import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import Settings from './pages/Settings';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/"><strong>Home</strong></Link></li>
                        <li><Link to="/info"><strong>Info</strong></Link></li>
                        <li><Link to="/settings"><strong>Settings</strong></Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
