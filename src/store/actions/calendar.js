import { ApiGeneral } from "../../API/Api";

export const ADD_DAY_TODO = "ADD_DAY_TODO";
export const DELETE_DAY_TODO = "DELETE_DAY_TODO";
export const SET_DAY_TODO = "SET_DAY_TODO";

export const addDayTodo = (day, month, color, id) => {
  return async (dispatch, getState) => {
    if (
      day !== undefined &&
      month !== undefined &&
      color !== "" &&
      id !== undefined
    ) {
      const loggedIn = getState().login.loggedIn;
      let email;
      let token;
      if (loggedIn) {
        email = getState().login.email;
        token = getState().login.token;
      }
      const data = {
        day,
        month,
        color,
        id,
        email,
      };

      const response = await ApiGeneral(token, data, "addTodoDay");
      console.log(response);
      if (response.data.status === 500) {
        throw new Error(response.data.message);
      }
      if (response.data.status === 200) {
        dispatch({ type: ADD_DAY_TODO, todoDays: data });
      } else {
        if (response.data.status === 204) {
          dispatch({ type: DELETE_DAY_TODO, todoDays: data });
        } else {
          throw new Error("Algo salio mal");
        }
      }
    } else {
      throw new Error(
        "Alguno de los datos estan incompletos, por favor, verifique que color y su tarea este seleccionada"
      );
    }
  };
};

export const setDaysTodo = () => {
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
      const response = await ApiGeneral(token, data, "fetchDaysTodo");
      let allTodos = [];
      const resData = response.data;
      for (const key in resData) {
        allTodos.push(resData[key]);
      }
      console.log(allTodos);
      // for (const key in resData) {
      //   let obj = { todo: resData[key], id: key };
      //   allTodos.push(obj);
      // }
      dispatch({ type: SET_DAY_TODO, todoDays: allTodos });
    } catch (error) {
      throw new Error(error.nessage);
    }
  };
};
