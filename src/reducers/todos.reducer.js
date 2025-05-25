export const actionTypes = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  savingTodos: 'savingTodos',
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

    // case actionTypes.savingTodos:
    //   return {
    //     ...state,
    //     isSaving: action.payload,
    //   };
    // case actionTypes.errorMessage:
    //   return {
    //     ...state,
    //     errorMessage: action.payload,
    //   };
  }
}
