import React, { useMemo } from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, updateTodo }) {
  const filteredTodoList = useMemo(() => {
    return todoList.filter((todo) => !todo.isCompleted);
  }, [todoList]);

  return (
    <>
      {filteredTodoList.length ? (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </ul>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  );
}

export default TodoList;
