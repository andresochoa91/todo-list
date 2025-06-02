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

  // const [todoList, setTodoList] = useState([]);
  // const [_, setTodoList] = useState([]);
  // const [workingTodo, setWorkingTodo] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [isSaving, setIsSaving] = useState(false);
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
      // setIsLoading(true);
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

          // const todoRecords = records.map((record) => {
          //   return {
          //     id: record.id,
          //     title: record.fields.title,
          //     isCompleted: record.fields.isCompleted ?? false,
          //   };
          // });

          // setTodoList(todoRecords);
          dispatch({ type: actionTypes.loadTodos, payload: records });
        }
      } catch (error) {
        // setErrorMessage(error.message);
        dispatch({ type: actionTypes.setLoadError, payload: error.message });
      }
      // finally {
      //   // setIsLoading(false);
      // }
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

        // const { id, fields } = records[0];

        // const newTodoRecordToSet = {
        //   id,
        //   title: fields.title,
        //   isCompleted: fields.isCompleted ?? false,
        // };

        // // setTodoList([...todoList, newTodoRecordToSet]);
        // setTodoList([...todosState.todoList, newTodoRecordToSet]);
      }
    } catch (error) {
      // setErrorMessage(error.errorMessage);
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
    }
    // finally {
    //   // setIsSaving(false);
    // }
  }

  async function onCompleteTodo(id) {
    // setTodoList(
    //   todosState.todoList.map((todo) => {
    //     if (todo.id === id) {
    //       todo.isCompleted = true;
    //     }
    //     return todo;
    //   })
    // );

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

    // setIsSaving(true);
    dispatch({ type: actionTypes.startRequest });

    try {
      const resp = await fetch(encodeUrl, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        dispatch({ type: actionTypes.updateTodo, payload: records });

        // const { id, fields } = records[0];

        // const editedTodoRecordToSet = {
        //   id,
        //   title: fields.title,
        //   isCompleted: fields.isCompleted ?? false,
        // };

        // const updatedTodos = todosState.todoList.map((todo) => {
        //   if (todo.id === id) {
        //     return editedTodoRecordToSet;
        //   }
        //   return todo;
        // });

        // setTodoList([...updatedTodos]);
      }
    } catch (error) {
      // setErrorMessage(error.message);
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
    }
    // finally {
    //   // setIsSaving(false);
    // }
  }

  async function updateTodo(editedTodo) {
    // const revertedTodos = todosState.todoList;

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

    // setIsSaving(true);
    dispatch({ type: actionTypes.startRequest });

    try {
      const resp = await fetch(encodeUrl, options);

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();

        dispatch({ type: actionTypes.updateTodo, payload: records });

        // const { id, fields } = records[0];

        // const editedTodoRecordToSet = {
        //   id,
        //   title: fields.title,
        //   isCompleted: fields.isCompleted ?? false,
        // };

        // const updatedTodos = todosState.todoList.map((todo) => {
        //   if (todo.id === editedTodo.id) {
        //     return editedTodoRecordToSet;
        //   }
        //   return todo;
        // });

        // setTodoList([...updatedTodos]);
      }
    } catch (error) {
      // setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({ type: actionTypes.setLoadError, payload: error.message });
      // setTodoList([...revertedTodos]);
    }
    // finally {
    //   // setIsSaving(false);
    // }
  }

  return (
    <div className={style.Body}>
      <div>
        <Header />
        <TodoForm
          onAddTodo={handleAddTodo}
          // workingTodo={workingTodo}
          // setWorkingTodo={setWorkingTodo}
          isSaving={todosState.isSaving}
        />
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
