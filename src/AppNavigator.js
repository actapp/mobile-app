import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'

import WelcomeScreen from './presentation/screens/welcome/WelcomeScreen'
import Colors from './presentation/style/Colors'
import HomeScreen from './presentation/screens/home/HomeScreen';
import StartShareScreen from './presentation/screens/share/StartShareScreen'
import ShareScreen from './presentation/screens/share/ShareScreen'
import LearnScreen from './presentation/screens/learn/LearnScreen';
import AdminHomeScreen from './presentation/screens/home/AdminHomeScreen';
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
    [WelcomeScreen.KEY]: {
        screen: WelcomeScreen
    },
    [HomeScreen.KEY]: {
        screen: HomeScreen
    },
    [AdminHomeScreen.KEY]: {
        screen: AdminHomeScreen
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
            headerLeft: null
        }
    }
))

export function buildResetToRouteAction(screenKey) {
    return StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screenKey })],
    });
}