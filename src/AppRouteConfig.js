import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from './presentation/screens/welcome/WelcomeScreen'
import Colors from './presentation/style/Colors'
import HomeScreen from './presentation/screens/home/HomeScreen';
import StartShareScreen from './presentation/screens/share/StartShareScreen'
import ShareScreen from './presentation/screens/share/ShareScreen'
import LearnScreen from './presentation/screens/learn/LearnScreen';
import AdminHomeScreen from './presentation/screens/home/AdminHomeScreen';

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