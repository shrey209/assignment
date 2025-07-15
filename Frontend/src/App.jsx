import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Leaderboard from "./components/leaderboard";
import UserManagement from "./components/UserManagement";
import History from "./components/History";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">Leaderboard System</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Leaderboard</Link>
            </li>
            <li>
              <Link to="/users">Manage Users</Link>
            </li>
            <li>
              <Link to="/history">Claim History</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Leaderboard App</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
