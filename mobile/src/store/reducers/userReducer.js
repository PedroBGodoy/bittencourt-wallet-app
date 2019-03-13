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
  registering: false
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case USER_BEGIN:
      return {
        ...state
      };
    case USER_SUCCESS:
      const values = action.payload.user.data;
      return {
        ...state,
        name: values.user.name,
        email: values.user.email,
        accessToken: values.token,
        loged: true
      };
    case USER_ERROR:
      const error = action.payload.error;
      let errorMessage = "";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = "Erro desconhecido!";
        }
      } else {
        errorMessage = "Erro desconhecido!";
      }

      return {
        ...state,
        error: errorMessage,
        name: "",
        email: "",
        accessToken: "",
        loged: false
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
        accessToken: "false"
      };

    default:
      return state;
  }
}
