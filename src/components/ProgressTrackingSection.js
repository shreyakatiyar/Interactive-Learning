import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(6, 0),
    textAlign: 'center',
  },
  content: {
    maxWidth: 600,
    margin: '0 auto',
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const ProgressTrackingSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container
        maxWidth="md"
        className={classes.content}
      >
        <Typography variant="h4" gutterBottom>
          Track Your Progress
        </Typography>
        <Typography variant="body1" paragraph>
          Monitor your learning journey with detailed progress tracking features.
        </Typography>
        <Link to="/progress-tracker">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          View Progress
        </Button>
        </Link>
      </Container>
    </section>
  );
};

export default ProgressTrackingSection;
