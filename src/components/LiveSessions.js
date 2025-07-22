import React, { useContext } from 'react';
import { DataContext } from '../DataContext';
import { Container, Typography, Paper, Box, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  sessionImage: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.spacing(1),
  },
  sessionContent: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  time: {
    marginBottom: theme.spacing(2),
  },
  button: {
    textAlign: 'right',
  },
}));

const LiveSessions = () => {
  const { liveSessions } = useContext(DataContext);
  const classes = useStyles();

  return (<>
    <Container className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>
        Live Sessions
      </Typography>
      {liveSessions.map((session) => (
        <Paper key={session.id} className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <img src={session.image} alt={session.title} className={classes.sessionImage} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box className={classes.sessionContent}>
                <Typography variant="h6" component="h2" className={classes.title}>
                  {session.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" className={classes.description}>
                  {session.description}
                </Typography>
                <Typography variant="string" display="block" color="text.secondary" className={classes.time}>
                  Date: {session.date}
                </Typography>
                <Typography variant="string" display="block" color="text.secondary" className={classes.time}>
                  Time: {session.time}
                </Typography>
                <div className={classes.button}>
                  <Button variant="contained" color="primary" size="large">
                    Join Session
                  </Button>
                </div>
              </Box>
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
    <Footer />
    </>
  );
};

export default LiveSessions;
