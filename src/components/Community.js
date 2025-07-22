import React, { useContext } from 'react';
import { DataContext } from '../DataContext';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  userImage: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));

const Community = () => {
  const { communityPosts } = useContext(DataContext);
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom style={{display:"flex", justifyContent:"center"}}>
        Community Forum
      </Typography>
      {communityPosts.map(post => (
        <Paper key={post.id} className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img src={post.image} alt={post.user} className={classes.userImage} />
            </Grid>
            <Grid item xs>
              <Typography variant="body1">
                <strong>{post.user}</strong>: {post.post}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.timestamp}
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

export default Community;
