import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Accounts from './pages/accouts'
import NewTransaction from './pages/newTransaction'
import Login from './pages/Login'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Accounts,
        NewTransaction
    })
);

export default Routes;