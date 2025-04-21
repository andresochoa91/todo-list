import React, { useState } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import Title from './Title';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [workingTodo, setWorkingTodo] = useState('');

  function handleAddTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function onCompleteTodo(id) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = true;
        }
        return todo;
      })
    );
  }

  function updateTodo(editedTodo) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === editedTodo.id) {
          todo.title = editedTodo.title;
        }
        return todo;
      })
    );
  }

  return (
    <div>
      <Title title="Todo List" />
      <TodoForm
        onAddTodo={handleAddTodo}
        workingTodo={workingTodo}
        setWorkingTodo={setWorkingTodo}
      />
      <TodoList
        todoList={todoList}
        onCompleteTodo={onCompleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
