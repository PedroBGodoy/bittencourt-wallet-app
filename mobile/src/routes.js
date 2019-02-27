import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Accounts from './pages/Accouts'
import NewTransaction from './pages/NewTransaction'
import Login from './pages/Login'
import Settings from './pages/Settings'
import EditTransaction from './pages/EditTransaction'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Accounts,
        NewTransaction,
        Settings,
        EditTransaction
    })
);

export default Routes;