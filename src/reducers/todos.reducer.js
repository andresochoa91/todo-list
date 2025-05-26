export const actionTypes = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  addTodo: 'addTodo',
  updateTodo: 'updateTodo',
  startRequest: 'startRequest',
  errorMessage: 'errorMessage',
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function TodosReducer(state, action) {
  switch (action.type) {
    case actionTypes.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actionTypes.loadTodos:
      return {
        ...state,
        todoList: action.payload.map((record) => {
          return {
            id: record.id,
            title: record.fields.title,
            isCompleted: record.fields.isCompleted ?? false,
          };
        }),
        isLoading: false,
      };
    case actionTypes.addTodo:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: action.payload[0].id,
            title: action.payload[0].fields.title,
            isCompleted: action.payload[0].fields.isCompleted,
          },
        ],
        isSaving: false,
      };
    case actionTypes.updateTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload[0].id) {
            return {
              id: action.payload[0].id,
              title: action.payload[0].fields.title,
              isCompleted: action.payload[0].fields.isCompleted ?? false,
            };
          } else {
            return todo;
          }
        }),
        isSaving: false,
      };

    // const { records } = await resp.json();

    //   const { id, fields } = records[0];

    //   const editedTodoRecordToSet = {
    //     id,
    //     title: fields.title,
    //     isCompleted: fields.isCompleted ?? false,
    //   };

    //   const updatedTodos = todosState.todoList.map((todo) => {
    //     if (todo.id === id) {
    //       return editedTodoRecordToSet;
    //     }
    //     return todo;
    //   });

    //   setTodoList([...updatedTodos]);
    // case actionTypes.errorMessage:
    //   return {
    //     ...state,
    //     errorMessage: action.payload,
    //   };
  }
}
