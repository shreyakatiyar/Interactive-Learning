import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Fade } from '@mui/material';

const HeroSection = () => {
  return (
    <section className="hero">
      <Grid container spacing={2} alignItems="center">
        {/* Left side: Text content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
              Welcome to Your Learning Platform
            </Typography>
            <Typography variant="body1" gutterBottom>
              Start your journey with our comprehensive courses and interactive content.
            </Typography>
            <Link to="/courses" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="large">
                Explore Courses
              </Button>
            </Link>
          </Box>
        </Grid>

        {/* Right side: Image with animation */}
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1500}>
            <Box
              component="img"
              src="https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap_335657-3285.jpg"
              alt="Students learning online"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Fade>
        </Grid>
      </Grid>
    </section>
  );
};

export default HeroSection;
