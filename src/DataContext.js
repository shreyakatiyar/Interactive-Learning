import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // State for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn React basics with hands-on examples.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/4DqAvWonPAg?si=zrmPRtyTPIMtkzSX', // Example YouTube embed link
      lectures: [
        { id: 1, title: 'React Basics', duration: '10:30' },
        { id: 2, title: 'State Management', duration: '15:45' },
        { id: 3, title: 'React Hooks', duration: '12:20' },
        { id: 4, title: 'Context API', duration: '18:10' },
        { id: 5, title: 'Redux Overview', duration: '20:00' },
      ],
    },
    {
      id: 2,
      title: 'CSS Fundamentals',
      description: 'Master CSS with this comprehensive course.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/WuiB5TAQOAM?si=wD4pfymOiqO1MzLN', // Example YouTube embed link
      lectures: [
        { id: 1, title: 'CSS Basics', duration: '12:00' },
        { id: 2, title: 'Flexbox Layouts', duration: '16:30' },
        { id: 3, title: 'CSS Grid', duration: '14:15' },
        { id: 4, title: 'Animations with CSS', duration: '22:45' },
        { id: 5, title: 'Responsive Design', duration: '19:20' },
      ],
    },
    {
      id: 3,
      title: 'JavaScript Advanced Techniques',
      description: 'Explore advanced JavaScript concepts.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/ks4MFTHLfyg?si=vRJDWOuesdrqqfoD', // Example YouTube embed link
      lectures: [
        { id: 1, title: 'Asynchronous JavaScript', duration: '18:30' },
        { id: 2, title: 'ES6 Features', duration: '15:00' },
        { id: 3, title: 'Functional Programming', duration: '20:45' },
        { id: 4, title: 'JavaScript Patterns', duration: '17:10' },
        { id: 5, title: 'Node.js Fundamentals', duration: '21:50' },
      ],
    },
    {
      id: 4,
      title: 'Web Design Principles',
      description: 'Learn design principles for creating beautiful websites.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/GJN7TemsZtY?si=h5ItB2yxkLNMeQQi', // Example image URL
      lectures: [
        { id: 1, title: 'Color Theory', duration: '12:30' },
        { id: 2, title: 'Typography Basics', duration: '14:20' },
        { id: 3, title: 'Designing for UX', duration: '16:15' },
        { id: 4, title: 'Responsive Web Design', duration: '19:40' },
        { id: 5, title: 'Web Accessibility', duration: '18:00' },
      ],
    },
    {
      id: 5,
      title: 'Graphic Design Basics',
      description: 'Introduction to graphic design tools and techniques.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/UmHMVU6dceA?si=r6HL2FGqziQUI0Wl', // Example image URL
      lectures: [
        { id: 1, title: 'Introduction to Photoshop', duration: '14:45' },
        { id: 2, title: 'Creating Vector Graphics', duration: '17:20' },
        { id: 3, title: 'Digital Illustration', duration: '20:10' },
        { id: 4, title: 'Typography in Design', duration: '16:30' },
        { id: 5, title: 'Color Palettes', duration: '15:55' },
      ],
    },
    // Additional courses
    {
      id: 6,
      title: 'Advanced React Topics',
      description: 'Deep dive into advanced React concepts and best practices.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/HxxN6AdEop0?si=e5h6_aQZzKT6I1Gn',
      lectures: [
        { id: 1, title: 'Server-side Rendering with React', duration: '18:30' },
        { id: 2, title: 'Performance Optimization Techniques', duration: '21:15' },
        { id: 3, title: 'Building Custom Hooks', duration: '16:50' },
        { id: 4, title: 'Testing React Components', duration: '19:40' },
        { id: 5, title: 'Advanced State Management', duration: '22:20' },
      ],
    },
    {
      id: 7,
      title: 'Advanced CSS Tricks',
      description: 'Explore advanced CSS techniques and animations.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/IqdgKJLn_wI?si=cQqdNk0bOypWY_nP',
      lectures: [
        { id: 1, title: 'CSS Variables and Custom Properties', duration: '14:20' },
        { id: 2, title: 'Advanced Keyframe Animations', duration: '17:45' },
        { id: 3, title: 'Creating Responsive Layouts', duration: '13:30' },
        { id: 4, title: 'Transforms and Transitions', duration: '18:15' },
        { id: 5, title: 'Grid and Flexbox Advanced Techniques', duration: '19:50' },
      ],
    },
    {
      id: 8,
      title: 'Node.js Essentials',
      description: 'Learn essential Node.js concepts for server-side development.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/FdaVsce3ftQ?si=bR-E1hRX3sYMZbv_',
      lectures: [
        { id: 1, title: 'Introduction to Node.js', duration: '15:20' },
        { id: 2, title: 'Express.js Framework', duration: '18:45' },
        { id: 3, title: 'Working with MongoDB', duration: '16:10' },
        { id: 4, title: 'Authentication and Authorization', duration: '20:30' },
        { id: 5, title: 'Building RESTful APIs', duration: '22:05' },
      ],
    },
    {
      id: 9,
      title: 'UI/UX Design Fundamentals',
      description: 'Fundamental principles of UI/UX design for web and mobile applications.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/_6Tl2_eM0DE?si=mPrB6SpvF5m_iQ3J',
      lectures: [
        { id: 1, title: 'User Interface Design Principles', duration: '12:50' },
        { id: 2, title: 'Wireframing and Prototyping', duration: '14:25' },
        { id: 3, title: 'Designing for Mobile Platforms', duration: '17:30' },
        { id: 4, title: 'Visual Design Fundamentals', duration: '19:15' },
        { id: 5, title: 'Design Systems Overview', duration: '16:40' },
      ],
    },
    {
      id: 10,
      title: 'Digital Marketing Basics',
      description: 'Learn the fundamentals of digital marketing strategies and tools.',
      contentType: 'video',
      content: 'https://www.youtube.com/embed/nkNHn0VqVBA?si=3pjpLksGmURr5eew',
      lectures: [
        { id: 1, title: 'SEO Fundamentals', duration: '15:10' },
        { id: 2, title: 'Social Media Marketing Techniques', duration: '18:20' },
        { id: 3, title: 'Email Marketing Strategies', duration: '14:50' },
        { id: 4, title: 'Google Analytics Essentials', duration: '21:00' },
        { id: 5, title: 'Content Marketing Basics', duration: '19:30' },
      ],
    },
  ]);

  // State for community posts (continued)
const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      user: 'John Doe',
      post: 'Just finished the React course, it was amazing!',
      timestamp: '2024-06-19',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtadGP1hZYiB8hUNTPz_-4ajD2Ye36PaGMHQ&s"
    },
    {
      id: 2,
      user: 'Jane Smith',
      post: 'Looking for advice on CSS animations. Any tips?',
      timestamp: '2024-06-18',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa_n8eKnMUxQY36jRpL6R-HDTcWQm6E4jAQ&s"
    },
    {
      id: 3,
      user: 'Alice Johnson',
      post: 'Started learning JavaScript. Feeling excited!',
      timestamp: '2024-06-17',
      image: "https://media.gettyimages.com/id/112448760/photo/scarlett-alice-johnson-attends-the-world-premiere-of-adulthood-at-the-empire-leicester-square.jpg?s=612x612&w=gi&k=20&c=cJeaqtfhO_mYsfd6y_JbFnadj1UvgkHD9LN2hCKv6O8="
    },
    {
      id: 4,
      user: 'Bob Anderson',
      post: 'Struggling with Redux. Any good resources?',
      timestamp: '2024-06-16',
      image :"https://motorsportmagazine.b-cdn.net/database/wp-content/uploads/sites/2/2021/01/anderson02.jpg"
    },
    {
      id: 5,
      user: 'Emma Wilson',
      post: 'Completed the CSS Fundamentals course. Ready for the next challenge!',
      timestamp: '2024-06-15',
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bMKHZaXb3PacpSf-iNc2k0TQQyVOztuFZQ&s"
    },
  ]);
  
  // State for live sessions
  const [liveSessions, setLiveSessions] = useState([
    {
      id: 1,
      image:'https://i.ytimg.com/vi/i5ier3ldD_8/hqdefault.jpg?v=62a84408',
      title: 'React Hooks Deep Dive',
      description: 'Advanced techniques for managing state in React applications.',
      time: '10:00 PM',
      date:'2024-06-20',
    },
    {
      id: 2,
      image:'https://cdn.fs.teachablecdn.com/R5EG2Kp4SoaDOev0Immm',
      title: 'CSS Grid Layouts Workshop',
      description: 'Learn how to create complex layouts using CSS Grid.',
      time: '14:00 PM',
      date:'2024-06-21',
    },
    {
      id: 3,
      image:'https://miro.medium.com/v2/resize:fit:1100/0*llwXUZ9AFQ95kd_X.jpeg',
      title: 'JavaScript ESNext Features',
      description: 'Exploring the latest features in JavaScript ESNext.',
      time: '11:30 AM',
      date:'2024-06-22',
    },
    {
      id: 4,
      image:'https://media.geeksforgeeks.org/wp-content/uploads/20230331172641/NodeJS-copy.webp',
      title: 'Node.js Advanced Topics',
      description: 'Advanced Node.js concepts and best practices.',
      date: '2024-06-23', 
      time: '9:00 AM',
    },
    {
      id: 5,
      title: 'UI/UX Design Trends 2024',
      image:'https://www.visily.ai/wp-content/uploads/2024/01/7-UX-Design-Trends-in-2024-scaled-1200x675.jpg',
      description: 'Exploring the latest trends in UI/UX design for modern applications.',
      time: '13:45 PM',
      date: '2024-06-24',
    },
  ]);
  
  // State for progress tracking
  const [progress, setProgress] = useState([
    {
      id: 1,
      user: 'John Doe',
      course: 'Introduction to React',
      progress: 50,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtadGP1hZYiB8hUNTPz_-4ajD2Ye36PaGMHQ&s"

    },
    {
      id: 2,
      user: 'Jane Smith',
      course: 'CSS Fundamentals',
      progress: 100,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa_n8eKnMUxQY36jRpL6R-HDTcWQm6E4jAQ&s"

    },
    {
      id: 3,
      user: 'Alice Johnson',
      course: 'JavaScript Advanced Techniques',
      progress: 30,
      image: "https://media.gettyimages.com/id/112448760/photo/scarlett-alice-johnson-attends-the-world-premiere-of-adulthood-at-the-empire-leicester-square.jpg?s=612x612&w=gi&k=20&c=cJeaqtfhO_mYsfd6y_JbFnadj1UvgkHD9LN2hCKv6O8="

    },
    {
      id: 4,
      user: 'Bob Anderson',
      course: 'Web Design Principles',
      progress: 60,
      image :"https://motorsportmagazine.b-cdn.net/database/wp-content/uploads/sites/2/2021/01/anderson02.jpg"

    },
    {
      id: 5,
      user: 'Emma Wilson',
      course: 'Graphic Design Basics',
      progress: 10,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bMKHZaXb3PacpSf-iNc2k0TQQyVOztuFZQ&s"
    },
  ]);
  
  // State for quiz questions
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: 1,
      question: 'What is React?',
      options: ['A JavaScript library for building user interfaces', 'A CSS framework', 'A server-side language'],
      answer: 'A JavaScript library for building user interfaces',
    },
    {
      id: 2,
      question: 'What does CSS stand for?',
      options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets'],
      answer: 'Cascading Style Sheets',
    },
    {
      id: 3,
      question: 'What is JavaScript primarily used for?',
      options: ['Front-end web development', 'Database management', 'Server-side scripting'],
      answer: 'Front-end web development',
    },
    {
      id: 4,
      question: 'What is the CSS Grid layout system?',
      options: ['A method for aligning elements in a grid', 'A JavaScript library for animations', 'A tool for database management'],
      answer: 'A method for aligning elements in a grid',
    },
    {
      id: 5,
      question: 'What is the role of Redux in React applications?',
      options: ['State management', 'CSS framework', 'Server-side scripting language'],
      answer: 'State management',
    },
  ]);
  
  return (
    <DataContext.Provider
      value={{
        courses,
        communityPosts,
        liveSessions,
        progress,
        quizQuestions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
  };
  
  