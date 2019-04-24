import {
  USER_BEGIN,
  USER_SUCCESS,
  USER_ERROR,
  USER_TOGGLE_REGISTER_FORM,
  USER_LOG_OUT,
  USER_GET_LOGIN
} from "../actions/userActions";

const initialState = {
  name: "",
  email: "",
  accessToken: "",
  loged: false,
  registering: false,
  loading: false
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case USER_BEGIN:
      return {
        ...state,
        loading: true
      };
    case USER_SUCCESS:
      const values = action.payload.user;
      return {
        ...state,
        name: values.user.name,
        email: values.user.email,
        accessToken: values.token,
        loged: true,
        loading: false
      };
    case USER_ERROR:
      let errorMessage = action.payload.error;
      return {
        ...state,
        error: errorMessage,
        name: "",
        email: "",
        accessToken: "",
        loged: false,
        loading: false
      };

    case USER_TOGGLE_REGISTER_FORM:
      return {
        ...state,
        registering: !state.registering
      };

    case USER_LOG_OUT:
      return {
        ...state,
        registering: false,
        loged: false,
        name: "",
        email: "",
        accessToken: "",
        loading: false
      };
    case USER_GET_LOGIN:
      return {
        ...state,
        registering: false,
        loged: action.payload.user.loged,
        name: action.payload.user.name,
        email: action.payload.user.email,
        accessToken: action.payload.user.token,
        loading: false
      };

    default:
      return state;
  }
}
