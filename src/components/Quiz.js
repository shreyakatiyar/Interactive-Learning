import React, { useState, useContext } from 'react';
import { DataContext } from '../DataContext';
import { Container, Typography, Button, Box, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  scoreCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  optionButton: {
    width: '100%',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    fontSize: '16px',
  },
  correct: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
  incorrect: {
    backgroundColor: '#f44336',
    color: '#ffffff',
  },
  progress: {
    marginBottom: theme.spacing(3),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const Quiz = () => {
  const { quizQuestions } = useContext(DataContext);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const classes = useStyles();

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback('');
    }, 1000);
  };

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quiz
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion / quizQuestions.length) * 100} 
          className={classes.progress} 
        />
        {currentQuestion < quizQuestions.length ? (
          <Card className={classes.questionCard}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {quizQuestions[currentQuestion].question}
              </Typography>
              <Grid container spacing={2} justifyContent="center">
  {quizQuestions[currentQuestion].options.map((option, index) => (
    <Grid item xs={12} key={index}>
      <Button
        variant="contained"
        onClick={() => handleAnswer(option)}
        className={`${classes.optionButton} ${
          selectedOption ? (option === quizQuestions[currentQuestion].answer ? classes.correct : classes.incorrect) : ''
        }`}
        disabled={!!selectedOption}
        fullWidth // Ensures the button takes full width of the grid item
      >
        {option}
      </Button>
    </Grid>
  ))}
</Grid>

              {feedback && (
                <Typography variant="h6" component="p" className={classes.feedback}>
                  {feedback}
                </Typography>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.scoreCard}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                Quiz Completed
              </Typography>
              <Typography variant="h5" component="h3" gutterBottom>
                Your score: {score} / {quizQuestions.length}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Link to="/" style={{ textDecoration: 'none', display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" size="large">
            Back To Home
          </Button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Quiz;
