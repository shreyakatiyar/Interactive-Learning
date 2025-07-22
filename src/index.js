import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { DataProvider } from './DataContext';
import './styles.css';

const theme = createTheme();

ReactDOM.render(
  <DataProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </DataProvider>,
  document.getElementById('root')
);
