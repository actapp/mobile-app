import React, { Component } from 'react'

import { StatusBar, View } from 'react-native'

import { connect } from 'react-redux'
import { AuthStatus } from './presentation/redux/Auth'

import { createAppContainer } from 'react-navigation'
import createAppNavigator from './AppRouteConfig'

import codePush from 'react-native-code-push'

import AppConnect from './AppConnect'

import GetStartedScreen from './presentation/screens/welcome/GetStartedScreen';

import { LoadingIndicator } from './presentation/components/Foundation'
import Styles from './presentation/style/Styles'

class App extends Component {
    static ERROR_SOURCE = 'App'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        StatusBar.setBarStyle('light-content')

        this.props.listenForAuthChanges()
        this.handleAuthState()

        this.appInitializeTimeout = setTimeout(() => {
            this.props.timeout(App.ERROR_SOURCE)
        }, 10000)
    }

    componentDidUpdate() {
        this.handleAuthState()
    }

    componentWillUnmount() {
        clearTimeout(this.appInitializeTimeout)
        this.props.stopListeningForAuthChanges()
    }

    render() {
        return (
            <View style={Styles.centeredRootContainer}>
                <LoadingIndicator />
            </View>
        )
    }

    handleAuthState = () => {
        const { authStatus } = this.props

        console.log('Auth status updated: ' + authStatus)

        this.replaceScreen(GetStartedScreen.KEY)
        // switch(authStatus) {
        //     case AuthStatus.LOGGED_IN:
        //         // TODO - go to respective dashboard
        //         console.log('Logged in')
        //         break
        //     case AuthStatus.LOGGED_OUT:
        //         // No user logged in - go to get started
        //         this.replaceScreen(GetStartedScreen.KEY)
        //         break
        //     case AuthStatus.ERROR:
        //         // Handle error, then just go to get started screen? Maybe show alert / toast first
        //         // TODO - handleError()
        //         this.replaceScreen(GetStartedScreen.KEY)
        //         break
        //     case AuthStatus.NOT_READY:
        //     default:
        //         console.log('No log in status available')
        //         // Do nothing - just keep showing the loading bar until some log in status is obtained, or timeout
        //         break
        // }
    }

    replaceScreen(key) {
        // Clear the timeout for initializing, then go to the designated screen
        clearTimeout(this.appInitializeTimeout)
        this.props.navigation.replace(key)
    }
}

const appNavigator = createAppNavigator(
    connect(AppConnect.mapStateToProps, AppConnect.mapDispatchToProps)(App)
)

const appContainer = createAppContainer(appNavigator);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export default codePush(codePushOptions)(appContainer)