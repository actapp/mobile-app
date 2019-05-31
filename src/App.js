import React, { Component } from 'react'

import { StatusBar, View } from 'react-native'

import { connect } from 'react-redux'
import { AuthStatus } from './presentation/redux/Auth'

import { createAppContainer, StackActions } from 'react-navigation'
import createAppNavigator, { buildResetToRouteAction } from './AppNavigator'

import codePush from 'react-native-code-push'

import AppConnect from './AppConnect'

import GetStartedScreen from './presentation/screens/welcome/GetStartedScreen';

import { LoadingIndicator } from './presentation/components/Foundation'
import Styles from './presentation/style/Styles'
import AppConfig from './AppConfig';

import handleError, { GENERIC_ERROR, AUTH_ERROR, GET_ACCOUNT_ERROR, GET_MINISTRY_ERROR, UNKNOWN_STATE_ERROR } from './utils/GlobalErrorHandler'
import { alertError } from './presentation/alerts/Alerts'
import { AccountStatus } from './presentation/redux/Account';

import { MinistryStatus } from './presentation/redux/Ministry';
import DashboardScreen from './presentation/screens/home/DashboardScreen';

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
        const { auth, genericError } = this.props

        if (AppConfig.FORCE_FRESH_START) {
            this.replaceScreen(GetStartedScreen.KEY)
            return
        }

        if (genericError != null) {
            this.handleError(GENERIC_ERROR, genericError)
        }

        switch (auth.status) {
            case AuthStatus.LOGGED_IN:
                this.handleLoggedIn()
                break
            case AuthStatus.LOGGED_OUT:
                // No user logged in - go to get started
                this.replaceScreen(GetStartedScreen.KEY)
                break
            case AuthStatus.ERROR:
                this.handleError(AUTH_ERROR, this.props.auth.error)
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
        const { auth, account } = this.props

        console.log('Handling account status: ' + account.status)

        switch (account.status) {
            case AccountStatus.NOT_READY:
                this.props.fetchAccount(auth.user.uid)
                break
            case AccountStatus.READY:
                this.handleAccountReady()
                break
            case AccountStatus.GETTING:
                // Do nothing while account is being fetched
                break
            case AccountStatus.ERROR:
                this.handleError(GET_ACCOUNT_ERROR, this.props.account.error)
                break
            default:
                this.handleUnknownState(account.status)
                break
        }
    }

    handleAccountReady = () => {
        const { ministry, account } = this.props

        switch (ministry.status) {
            case MinistryStatus.NOT_READY:
                this.props.fetchMinistry(account.data.ministryId)
                break
            case MinistryStatus.GETTING:
                // Do nothing
                break
            case MinistryStatus.READY:
                this.props.navigation.dispatch(buildResetToRouteAction(DashboardScreen.KEY))
                break
            case MinistryStatus.ERROR:
                this.handleError(GET_MINISTRY_ERROR, ministry.error)
                break
            default:
                this.handleUnknownState(ministryStatus)
                break
        }
    }

    handleUnknownState = (state) => {
        this.replaceScreen(GetStartedScreen.KEY)
        handleError(UNKNOWN_STATE_ERROR, new Error('Unknown state: ' + state), ERROR_SOURCE)
    }
}

const appNavigator = createAppNavigator(
    connect(AppConnect.mapStateToProps, AppConnect.mapDispatchToProps)(App)
)

const appContainer = createAppContainer(appNavigator);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export default codePush(codePushOptions)(appContainer)