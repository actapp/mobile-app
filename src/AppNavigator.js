import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'


import Colors from './presentation/style/Colors'

import StartShareScreen from './presentation/screens/share2/StartShareScreen'
import ShareScreen from './presentation/screens/share2/ShareScreen'
import LearnScreen from './presentation/screens/learn/LearnScreen';

import GetStartedScreen from './presentation/screens/welcome/GetStartedScreen';
import LogInScreen from './presentation/screens/login/LogInScreen';
import CreateMinistryScreen from './presentation/screens/welcome/leader/CreateMinistryScreen'
import AssociateToMinistryScreen from './presentation/screens/welcome/sharer/AssociateToMinistryScreen'
import DashboardScreen from './presentation/screens/home/DashboardScreen';

export default createAppNavigator = (connectedAppComponent) => (createStackNavigator({
    App: {
        screen: connectedAppComponent
    },
    [LearnScreen.KEY]: {
        screen: LearnScreen
    },
    [StartShareScreen.KEY]: {
        screen: StartShareScreen
    },
    [ShareScreen.KEY]: {
        screen: ShareScreen
    },

    // ISSUE-9
    [GetStartedScreen.KEY]: {
        screen: GetStartedScreen
    },
    [LogInScreen.KEY]: {
        screen: LogInScreen
    },
    [CreateMinistryScreen.KEY]: {
        screen: CreateMinistryScreen
    },
    [AssociateToMinistryScreen.KEY]: {
        screen: AssociateToMinistryScreen
    },
    [DashboardScreen.KEY]: {
        screen: DashboardScreen
    }
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.rootBackgroundColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '100',
            },
            headerLeft: null,
            header: null
        }
    }
))

export function buildResetToRouteAction(screenKey) {
    return StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screenKey })],
    });
}