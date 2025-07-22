import React from 'react';
import HeroSection from './HeroSection';
import CoursesSection from './CoursesSection';
// import MultimediaContentSection from './MultimediaContentSection';
// import CommunityPostsSection from './CommunityPostsSection';
import EventsSection from './EventsSection';
import ProgressTrackingSection from './ProgressTrackingSection';
import Footer from './Footer';
import '../styles.css';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CoursesSection />
      {/* <MultimediaContentSection /> */}
      {/* <CommunityPostsSection /> */}
      <EventsSection />
      <ProgressTrackingSection />
      <Footer />
    </div>
  );
};

export default Home;
