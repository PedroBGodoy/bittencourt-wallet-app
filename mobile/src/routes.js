import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Accounts from './pages/Accouts'
import NewTransaction from './pages/NewTransaction'
import Login from './pages/Login'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Accounts,
        NewTransaction
    })
);

export default Routes;