import { ApiGeneral } from "../../API/Api";

export const LOGIN = "LOGIN";

export const SIGN_UP = "SIGN_UP";

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    const data = { email, password };
    const response = await ApiGeneral("", data, "loginUser");
    if (response.data.status !== 200) {
      throw new Error(response.data.mensaje);
    } else {
      dispatch({ type: LOGIN, token: response.data.token, email: email });
    }
  };
};

export const signUser = ({ email, password }) => {
  return async () => {
    try {
      const data = {
        email,
        password,
      };
      const response = await ApiGeneral("", data, "signUser");
      if (response.data.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
};
