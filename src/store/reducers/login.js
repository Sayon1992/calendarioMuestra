import { SIGN_UP, LOGIN } from "../actions/login";

const initialState = {
  token: "",
  loggedIn: false,
  email: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return state;
    case LOGIN:
      return {
        ...state,
        token: action.token,
        loggedIn: true,
        email: action.email,
      };
    default:
      return state;
  }
};
