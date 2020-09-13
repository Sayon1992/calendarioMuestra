import { ApiGeneral } from "../../API/Api";

export const SET_TODO = "SET_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const ADD_TODO = "ADD_TODO";
export const SELECT_COLOR = "SELECT_COLOR";
export const SELECT_TODO = "SELECT_TODO";

export const selectTodo = (todo, id) => {
  return async (dispatch, getState) => {
    const obj = {
      todo,
      id,
    };
    dispatch({ type: SELECT_TODO, todoSelected: obj });
  };
};

export const selectColor = (color) => {
  return async (dispatch, getState) => {
    dispatch({ type: SELECT_COLOR, color: color });
  };
};

export const fetchTodoList = () => {
  return async (dispatch, getState) => {
    const loggedIn = getState().login.loggedIn;
    let stateUser;
    let token;
    if (loggedIn) {
      stateUser = getState().login.email;
      token = getState().login.token;
    }
    const data = {
      email: stateUser,
    };
    try {
      const response = await ApiGeneral(token, data, "fetchTodoList");
      let allTodos = [];
      const resData = response.data;
      for (const key in resData) {
        let obj = { todo: resData[key], id: key };
        allTodos.push(obj);
      }
      dispatch({ type: SET_TODO, todos: allTodos });
    } catch (error) {
      throw new Error(error.nessage);
    }
  };
};

export const addTodoList = (todo) => {
  return async (dispatch, getState) => {
    const loggedIn = getState().login.loggedIn;
    let email;
    let token;
    if (loggedIn) {
      email = getState().login.email;
      token = getState().login.token;
    }
    const data = {
      email,
      todo,
    };
    try {
      const response = await ApiGeneral(token, data, "addTodoList");
      if (response.data.status === 500) {
        throw new Error(response.data.message);
      }
      const resData = await response.data;
      let obj = { todo: resData.todo, id: resData.id };
      dispatch({ type: ADD_TODO, todo: obj });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const deleteTodoList = (id) => {
  return async (dispatch, getState) => {
    const loggedIn = getState().login.loggedIn;
    let email;
    let token;
    if (loggedIn) {
      email = getState().login.email;
      token = getState().login.token;
    }
    const data = {
      email,
      id,
    };
    try {
      const response = await ApiGeneral(token, data, "deleteTodoList");
      const resData = await response.data;
      let obj = { todo: resData.todo, id: resData.id };
      dispatch({ type: REMOVE_TODO, todo: obj });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
