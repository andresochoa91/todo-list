import React, { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleOnUpdateTodo(event) {
    event.preventDefault();
    const newTodo = { ...todo, title: workingTitle };
    updateTodo(newTodo);
    setIsEditing(false);
  }

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  return (
    <li>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleOnUpdateTodo}>Update</button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
