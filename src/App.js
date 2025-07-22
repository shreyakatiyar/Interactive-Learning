import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Quiz from './components/Quiz';
import Community from './components/Community';
import LiveSessions from './components/LiveSessions';
import ProgressTracker from './components/ProgressTracker';
import MultimediaContent from './components/MultimediaContent';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element = {<Home/>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/community" element={<Community />} />
        <Route path="/live-sessions" element={<LiveSessions />} />
        <Route path="/progress-tracker" element={<ProgressTracker />} />
        <Route path="/multimedia-content" element={<MultimediaContent />} />
      </Routes>
    </div>
  );
}

export default App;
