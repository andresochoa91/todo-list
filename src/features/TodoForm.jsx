import React, { useRef, useState } from 'react';
import '../App.css';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
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
      <button disabled={!workingTodo} data-testid={'addTodoButton'}>
        Add todo
      </button>
    </form>
  );
}

export default TodoForm;
