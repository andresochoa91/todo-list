export const actionTypes = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  addTodo: 'addTodo',
  updateTodo: 'updateTodo',
  startRequest: 'startRequest',
  setLoadError: 'setLoadError',
  clearError: 'clearError',
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
    case actionTypes.setLoadError:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };
    case actionTypes.clearError:
      return {
        ...state,
        errorMessage: '',
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
  }
}
