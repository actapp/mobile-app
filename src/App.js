import React, { Component } from 'react'

import { StatusBar, View } from 'react-native'

import { connect } from 'react-redux'
import { AuthStatus } from './presentation/redux/Auth'

import { createAppContainer } from 'react-navigation'
import createAppNavigator from './AppNavigator'

import codePush from 'react-native-code-push'

import AppConnect from './AppConnect'

import GetStartedScreen from './presentation/screens/welcome/GetStartedScreen';

import { LoadingIndicator } from './presentation/components/Foundation'
import Styles from './presentation/style/Styles'
import AppConfig from './AppConfig';

import handleError, { GENERIC_ERROR, AUTH_ERROR } from './utils/GlobalErrorHandler'
import { alertError } from './presentation/alerts/Alerts'
import { AccountStatus } from './presentation/redux/Account';

import { resetToDashboardAction } from './presentation/screens/welcome/RoleBasedRouter'

class App extends Component {
    static ERROR_SOURCE = 'App'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        AppConfig.initialize()

        StatusBar.setBarStyle('light-content')

        this.props.listenForAuthChanges()
        this.handleState()

        this.appInitializeTimeout = setTimeout(() => {
            this.props.timeout(App.ERROR_SOURCE)
        }, 10000)
    }

    componentDidUpdate() {
        this.handleState()
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

    handleState = () => {
        const { authStatus } = this.props

        if (AppConfig.FORCE_FRESH_START) {
            this.replaceScreen(GetStartedScreen.KEY)
            return
        }

        if (this.props.genericError != null) {
            this.handleError(GENERIC_ERROR, this.props.genericError)
        }

        switch (authStatus) {
            case AuthStatus.LOGGED_IN:
                this.handleLoggedIn()
                break
            case AuthStatus.LOGGED_OUT:
                // No user logged in - go to get started
                this.replaceScreen(GetStartedScreen.KEY)
                break
            case AuthStatus.ERROR:
                this.handleError(AUTH_ERROR, this.props.authError)
                break
            case AuthStatus.NOT_READY:
            default:
                console.log('No log in status available')
                // Do nothing - just keep showing the loading bar until some log in status is obtained, or timeout
                break
        }
    }

    handleError = (name, error) => {
        // Handle error, then just go to get started screen? Maybe show alert / toast first
        handleError(name, error)
        alertError(error.message)
        this.replaceScreen(GetStartedScreen.KEY)
    }

    replaceScreen(key) {
        // Clear the timeout for initializing, then go to the designated screen
        clearTimeout(this.appInitializeTimeout)
        this.props.navigation.replace(key)
    }

    handleLoggedIn = () => {
        const { user, accountStatus, accountData } = this.props

        console.log('Handling account status: ' + accountStatus)

        switch (accountStatus) {
            case AccountStatus.NOT_READY:
                this.props.fetchAccount(user.uid)
                break
            case AccountStatus.READY:
                this.props.navigation.dispatch(resetToDashboardAction(accountData.role))
                break
            case AccountStatus.GETTING:
                // Do nothing while account is being fetched
                break
            default:
                this.replaceScreen(GetStartedScreen.KEY)
                break
        }
    }
}

const appNavigator = createAppNavigator(
    connect(AppConnect.mapStateToProps, AppConnect.mapDispatchToProps)(App)
)

const appContainer = createAppContainer(appNavigator);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export default codePush(codePushOptions)(appContainer)