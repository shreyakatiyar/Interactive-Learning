import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataProvider } from './DataContext';
import './index.css';   /* CSS variables + global reset — must come first */
import './styles.css';  /* Theme-aware MUI overrides + legacy classes */

ReactDOM.render(
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>,
  document.getElementById('root')
);
