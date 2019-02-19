import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Accounts from './pages/accouts'
import NewTransaction from './pages/newTransaction'

const Routes = createAppContainer(
    createSwitchNavigator({
        Accounts,
        NewTransaction
    })
);

export default Routes;