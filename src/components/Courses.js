import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    transition: 'transform 0.2s ease-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Courses = () => {
  const classes = useStyles();
  const { courses } = useContext(DataContext);

  return (<>
    <Container className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom style={{display:"flex", justifyContent:"center"}}>
        Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card className={classes.card} elevation={3}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="div" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/courses/${course.id}`} color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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

export default Courses;
