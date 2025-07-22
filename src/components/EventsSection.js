import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: '#f5f5f5',
    padding: '40px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  eventList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  event: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    },
  },
  eventImageContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '8px 8px 0 0',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  eventContent: {
    padding: '15px',
  },
  eventTitle: {
    marginBottom: '10px',
    color: '#333',
  },
  eventLink: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

const EventsSection = () => {
  const classes = useStyles();

  // Example events data
  const events = [
    {
      id: 1,
      image: 'https://i.ytimg.com/vi/i5ier3ldD_8/hqdefault.jpg?v=62a84408',
      title: 'React Hooks Deep Dive',
      description: 'Advanced techniques for managing state in React applications.',
      date: '2024-06-20',
      time: '10:00 PM',
    },
    {
      id: 2,
      image: 'https://cdn.fs.teachablecdn.com/R5EG2Kp4SoaDOev0Immm',
      title: 'CSS Grid Layouts Workshop',
      description: 'Learn how to create complex layouts using CSS Grid.',
      date: '2024-06-21',
      time: '02:00 PM',
    },
    // Add more events as needed
  ];

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h1 className={classes.title}>Upcoming Events</h1>
        <div className={classes.eventList}>
          {events.map((event) => (
            <div key={event.id} className={classes.event}>
              <div className={classes.eventImageContainer}>
                <img src={event.image} alt={event.title} className={classes.eventImage} />
              </div>
              <div className={classes.eventContent}>
                <h3 className={classes.eventTitle}>{event.title}</h3>
                <p>{event.description}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Time: {event.time}</p>
                <Link to="/live-sessions" className={classes.eventLink}>
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
