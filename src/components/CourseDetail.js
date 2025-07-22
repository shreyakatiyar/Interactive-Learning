import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../DataContext';
import { Container, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },
  lectureCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  lectureCardContent: {
    flexGrow: 1,
  },
  actionButton: {
    marginTop: 'auto',
  },
  backButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

const CourseDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { courses } = useContext(DataContext);
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  const { title, description, contentType, content, lectures } = course;

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="body1" component="div" style={{ textAlign: 'center', marginBottom: '20px' }}>
          {description}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {contentType === 'video' ? (
              <Card>
                <div className={classes.videoContainer}>
                  <iframe title={title} src={content} allowFullScreen />
                </div>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom style={{ textAlign: 'center' }}>
                    {title}
                  </Typography>
                  <Button variant="contained" color="primary" href={content} target="_blank" fullWidth>
                    Watch Introduction Video
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom style={{ textAlign: 'center' }}>
                    {title}
                  </Typography>
                  <img src={content} alt={title} style={{ width: '100%' }} />
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center' }}>
              Lectures
            </Typography>
            <Divider />
            {lectures.map((lecture) => (
              <Card key={lecture.id} className={classes.lectureCard}>
                <CardContent className={classes.lectureCardContent}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {lecture.title}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Duration: {lecture.duration}
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent className={classes.actionButton}>
                  <Button variant="outlined" color="primary" component={Link} to={`/courses/${id}/lectures/${lecture.id}`}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        {/* Back to Courses button */}
        <Button
          className={classes.backButton}
          variant="outlined"
          color="primary"
          component={Link}
          to="/courses"
        >
          Back to Courses
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default CourseDetail;
