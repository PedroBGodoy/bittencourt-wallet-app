import { combineReducers } from "redux";
import transactions from "./transactionsReducer";
import user from "./userReducer";

export default combineReducers({
  transactions,
  user
});
