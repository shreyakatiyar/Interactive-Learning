import React, { useContext } from 'react';
import { DataContext } from '../DataContext';
import { Container, Typography, Paper, Grid, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  userImage: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: '50%',
    objectFit: 'cover',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doughnutContainer: {
    width: '150px', // Control the size of the pie chart
    height: '150px', // Control the size of the pie chart
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  progressText: {
    marginTop: theme.spacing(1),
  },
}));

const ProgressTracker = () => {
  const classes = useStyles();
  const { progress } = useContext(DataContext);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Progress Tracker
      </Typography>
      {progress.map((p) => (
        <Paper key={p.id} className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box className={classes.userDetails}>
                <img src={p.image} alt={p.user} className={classes.userImage} />
                <Typography variant="body1" className={classes.progressText}>
                  <strong>{p.user}</strong>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Course: {p.course}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} className={classes.progressContainer}>
              <Box className={classes.doughnutContainer}>
                <Doughnut
                  data={{
                    labels: ['Completed', 'Remaining'],
                    datasets: [
                      {
                        data: [p.progress, 100 - p.progress],
                        backgroundColor: ['#3f51b5', '#e0e0e0'],
                        hoverBackgroundColor: ['#303f9f', '#c0c0c0'],
                      },
                    ],
                  }}
                  options={{
                    cutout: '60%',
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                          },
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
              <Typography variant="body2" className={classes.progressText}>
                {p.progress}% completed
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Link to="/" style={{ textDecoration: 'none', display:"flex", justifyContent:"center" }}>
              <Button variant="contained" color="primary" size="large">
                Back To Home
              </Button>
            </Link>
    </Container>
  );
};

export default ProgressTracker;
