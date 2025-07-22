import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { DataContext } from '../DataContext';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Zoom, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    transition: 'transform 0.2s ease-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  backButton: {
    marginTop: theme.spacing(2),
    display: 'block',
    margin: '0 auto',
  },
}));

const MultimediaContent = () => {
  const { courses } = useContext(DataContext);
  const classes = useStyles();

  return (<>
    <Container>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" padding="10px 0">
          Multimedia Content
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Zoom in={true} timeout={index * 250}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {course.contentType === 'video' && (
                  <CardMedia
                    component="iframe"
                    height="200"
                    src={course.content} // Example: YouTube video embed link
                    title={course.title}
                    className={classes.cardMedia}
                  />
                )}
                {course.contentType === 'image' && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.content} // Example: Image URL
                    alt={course.title}
                    className={classes.cardMedia}
                  />
                )}
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        <Button
          component={Link}
          to="/" // Specify the path to your home page
          variant="contained"
          color="primary"
          className={classes.backButton}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
    <Footer />
    </>
  );
};

export default MultimediaContent;
