import {
  ADD_DAY_TODO,
  DELETE_DAY_TODO,
  SET_DAY_TODO,
} from "../actions/calendar";

const initialState = {
  todoDays: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DAY_TODO:
      return {
        ...state,
        todoDays: state.todoDays.concat(action.todoDays),
      };
    case DELETE_DAY_TODO:
      return {
        ...state,
        todoDays: state.todoDays.filter(
          (todo) => todo.id !== action.todoDays.id
        ),
      };
    case SET_DAY_TODO:
      return {
        todoDays: action.todoDays,
      };
    default:
      return state;
  }
};
