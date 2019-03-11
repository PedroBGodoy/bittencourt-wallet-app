import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR
} from "../actions/transactionsActions";

const initialState = {
  transactions: [],
  loading: false,
  error: null
};

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions
      };
    case FETCH_TRANSACTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactions: []
      };

    default:
      return state;
  }
}
