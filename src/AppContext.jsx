import React, { useState } from 'react';
import { createContext } from 'react';
import App from './App';

export const ExampleContext = createContext({});

const AppContext = () => {
  const [title, setTitle] = useState('Todo list in context yay');
  return (
    <ExampleContext.Provider value={{ title, setTitle }}>
      <App />
    </ExampleContext.Provider>
  );
};

export default AppContext;
