import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#007bff",
    color: 'white',
    padding: theme.spacing(3, 0),
    marginTop: 'auto', // Ensures footer sticks to bottom of viewport
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  text: {
    marginBottom: theme.spacing(1),
    fontSize: '1.2rem', // Increase text size
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Typography variant="body1" className={`${classes.text} ${classes.link}`}>
          Made with ❤️ by <a className={classes.link}>Shreya</a>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
