import React, { useState, useEffect, useMemo, useReducer } from 'react';
import style from './App.module.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import {
  actionTypes,
  initialState,
  TodosReducer,
} from './reducers/todos.reducer';
import Header from './CustomHeader';

function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [todosState, dispatch] = useReducer(TodosReducer, initialState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirections] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useMemo(() => {
    let searchQuery = '';
    const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortDirection, sortField]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: actionTypes.fetchTodos });

      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(encodeUrl, options);

        if (!resp.ok) {
          const error = await resp.json();
          throw new Error(error.error.message);
        } else {
          const { records } = await resp.json();
          dispatch({ type: actionTypes.loadTodos, payload: records });
        }
      } catch (error) {
        dispatch({ type: actionTypes.setLoadError, payload: error.message });
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

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

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    // setIsSaving(true);
    dispatch({ type: actionTypes.startRequest });

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        dispatch({ type: actionTypes.addTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
    }
  }

  async function onCompleteTodo(id) {
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

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    dispatch({ type: actionTypes.startRequest });

    try {
      const resp = await fetch(encodeUrl, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        dispatch({ type: actionTypes.updateTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
    }
  }

  async function updateTodo(editedTodo) {
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

    dispatch({ type: actionTypes.startRequest });

    try {
      const resp = await fetch(encodeUrl, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        dispatch({ type: actionTypes.updateTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
    }
  }

  return (
    <div className={style.Body}>
      <div>
        <Header title />
        <TodoForm onAddTodo={handleAddTodo} isSaving={todosState.isSaving} />
        {todosState.isLoading ? (
          <p>Todo list loading...</p>
        ) : (
          <>
            <TodoList
              todoList={todosState.todoList}
              onCompleteTodo={onCompleteTodo}
              updateTodo={updateTodo}
            />
            {todosState.errorMessage && (
              <>
                <hr />
                <p>{todosState.errorMessage}</p>
                <button
                  onClick={() => dispatch({ type: actionTypes.clearError })}
                >
                  dismiss
                </button>
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
          queryString={queryString}
          setQueryString={setQueryString}
        />
      </div>
    </div>
  );
}

export default App;
