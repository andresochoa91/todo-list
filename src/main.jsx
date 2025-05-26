/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './AppContext.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className={'Item'}>
      <App />
    </div>
  </StrictMode>
);
