import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  actionButton: {
    marginTop: 'auto',
  },
}));

const CoursesSection = () => {
  const classes = useStyles();
  const { courses } = useContext(DataContext);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center' }}>
        All Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body1" component="p">
                  {course.description}
                </Typography>
              </CardContent>
              <CardContent className={classes.actionButton}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/courses/${course.id}`}
                  size="small"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesSection;
