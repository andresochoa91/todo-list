import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import Title from './Title';
import { returnOptions } from './requests';
import TodosViewForm from './features/TodosViewForm';

function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = ({ sortField, sortDirection }) => {
    const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    return encodeURI(`${url}?${sortQuery}`);
  };

  const [todoList, setTodoList] = useState([]);
  const [workingTodo, setWorkingTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirections] = useState('desc');

  useEffect(() => {
    return async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection }),
          options
        );

        if (!resp.ok) {
          throw new Error(resp.errorMessage);
        } else {
          const { records } = await resp.json();

          const todoRecords = records.map((record) => {
            return {
              id: record.id,
              title: record.fields.title,
              isCompleted: record.fields.isCompleted ?? false,
            };
          });

          setTodoList(todoRecords);
        }
      } catch (error) {
        setErrorMessage(error.errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
  }, [sortField, sortDirection]);

  async function handleAddTodo(newTodo) {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = returnOptions('POST', payload);

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        const { id, fields } = records[0];

        const newTodoRecordToSet = {
          id,
          title: fields.title,
          isCompleted: fields.isCompleted ?? false,
        };

        setTodoList([...todoList, newTodoRecordToSet]);
      }
    } catch (error) {
      setErrorMessage(error.errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  async function onCompleteTodo(id) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = true;
        }
        return todo;
      })
    );

    const payload = {
      records: [
        {
          id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    const options = returnOptions('PATCH', payload);

    try {
      setIsSaving(true);

      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        const { id, fields } = records[0];

        const editedTodoRecordToSet = {
          id,
          title: fields.title,
          isCompleted: fields.isCompleted ?? false,
        };

        const updatedTodos = todoList.map((todo) => {
          if (todo.id === id) {
            return editedTodoRecordToSet;
          }
          return todo;
        });

        setTodoList([...updatedTodos]);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function updateTodo(editedTodo) {
    const revertedTodos = todoList;

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);

      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        const { id, fields } = records[0];

        const editedTodoRecordToSet = {
          id,
          title: fields.title,
          isCompleted: fields.isCompleted ?? false,
        };

        const updatedTodos = todoList.map((todo) => {
          if (todo.id === editedTodo.id) {
            return editedTodoRecordToSet;
          }
          return todo;
        });

        setTodoList([...updatedTodos]);
      }
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting todo...`);
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <Title title="Todo List" />
      <TodoForm
        onAddTodo={handleAddTodo}
        workingTodo={workingTodo}
        setWorkingTodo={setWorkingTodo}
        isSaving={isSaving}
      />
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <>
          <TodoList
            todoList={todoList}
            onCompleteTodo={onCompleteTodo}
            updateTodo={updateTodo}
          />
          {errorMessage && (
            <>
              <hr />
              <p>{errorMessage}</p>
              <button onClick={() => setErrorMessage('')}>dismiss</button>
            </>
          )}
        </>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirections}
        sortField={sortField}
        setSortField={setSortField}
      />
    </div>
  );
}

export default App;
