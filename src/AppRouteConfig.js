import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from './presentation/screens/welcome/WelcomeScreen'
import Colors from './presentation/style/Colors'
import HomeScreen from './presentation/screens/home/HomeScreen';
import StartShareScreen from './presentation/screens/share/StartShareScreen'
import ShareScreen from './presentation/screens/share/ShareScreen'
import LearnScreen from './presentation/screens/learn/LearnScreen';

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