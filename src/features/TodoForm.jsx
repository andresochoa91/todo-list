import React, { useContext, useRef, useState } from 'react';
import '../App.css';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { Context } from '../AppContext';

function TodoForm({ onAddTodo, isSaving }) {
  const { title, setTitle } = useContext(Context);

  const todoTitleInput = useRef('');
  const [workingTodo, setWorkingTodo] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    const title = workingTodo;
    const id = Date.now();
    const isCompleted = false;
    onAddTodo({ title, id, isCompleted });
    todoTitleInput.current.focus();
    setWorkingTodo('');
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setTitle(title + 'new');
        handleAddTodo(event);
      }}
    >
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => setWorkingTodo(event.target.value)}
        elementId={'todoTitle'}
        labelText={'Todo'}
      />
      <button
        className={'Button'}
        disabled={!workingTodo}
        data-testid={'addTodoButton'}
      >
        {isSaving ? 'Saving...' : 'Add todo'}
      </button>
    </form>
  );
}

export default TodoForm;
