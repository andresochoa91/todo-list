import React from 'react';
import { createContext, useState } from 'react';
import App from './App';

export const Context = createContext({});

const AppContext = () => {
  const [title, setTitle] = useState('Todo list');

  return (
    <Context.Provider value={{ title, setTitle }}>
      <App />
    </Context.Provider>
  );
};

export default AppContext;
