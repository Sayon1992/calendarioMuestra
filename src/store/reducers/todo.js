import {
  SET_TODO,
  ADD_TODO,
  REMOVE_TODO,
  SELECT_COLOR,
  SELECT_TODO,
} from "../actions/todo";

const initialState = {
  todos: [],
  todoSelected: {},
  color: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.todos,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case REMOVE_TODO:
      const newTodos = state.todos.filter((todo) => todo.id !== action.todo.id);
      return {
        ...state,
        todos: newTodos,
      };
    case SELECT_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case SELECT_TODO:
      console.log(action.todoSelected);
      return {
        ...state,
        todoSelected: action.todoSelected,
      };
    default:
      return state;
  }
};
