import {
  USER_BEGIN,
  USER_SUCCESS,
  USER_ERROR,
  USER_TOGGLE_REGISTER_FORM,
  USER_LOG_OUT
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
        accessToken: "false",
        loading: false
      };

    default:
      return state;
  }
}
