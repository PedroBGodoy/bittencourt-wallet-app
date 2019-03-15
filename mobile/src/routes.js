import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Main from "./pages/Main";
import NewTransaction from "./pages/NewTransaction";
//import Login from "./pages/Login";
import Settings from "./pages/Settings";
import EditTransaction from "./pages/EditTransaction";
import Authentication from "./pages/Authentication";

const Routes = createAppContainer(
  createSwitchNavigator({
    Authentication,
    Main,
    NewTransaction,
    Settings,
    EditTransaction
  })
);

export default Routes;
