import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/quiz" className="nav-link">Quiz</Link>
        </li>
        <li className="nav-item">
          <Link to="/community" className="nav-link">Community</Link>
        </li>
        <li className="nav-item">
          <Link to="/live-sessions" className="nav-link">Live Sessions</Link>
        </li>
        <li className="nav-item">
          <Link to="/progress-tracker" className="nav-link">Progress Tracker</Link>
        </li>
        <li className="nav-item">
          <Link to="/multimedia-content" className="nav-link">Multimedia Content</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
