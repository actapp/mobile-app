import React, { Component } from 'react'

import { StatusBar, View } from 'react-native'

import { connect } from 'react-redux'
import AuthRedux from './presentation/redux/Auth'

import { createAppContainer } from 'react-navigation'
import createAppNavigator from './AppRouteConfig'

import codePush from 'react-native-code-push'

import AppConnect from './AppConnect'

import AppRouter from "./AppRouter";

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
        switch(authStatus) {
            case AuthRedux.Status.LOGGED_IN:
                // TODO - go to respective dashboard
                break
            case AuthRedux.Status.LOGGED_OUT:
                // No user logged in - go to get started
                replaceScreen(GetStartedScreen.KEY)
                break
            case AuthRedux.Status.ERROR:
                // Handle error, then just go to get started screen? Maybe show alert / toast first
                // TODO - handleError()
                replaceScreen(GetStartedScreen.KEY)
                break
            case AuthRedux.Status.NOT_READY:
            default:
                // Do nothing - just keep showing the loading bar until some log in status is obtained
                break
        }
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