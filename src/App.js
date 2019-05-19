import React, { Component } from 'react'

import { View } from 'react-native'

import { connect } from 'react-redux'

import { createAppContainer } from 'react-navigation'
import createAppNavigator from './AppRouteConfig'

import codePush from 'react-native-code-push'

import { LogInActions, LogInState } from './presentation/redux/LogIn'
import { ContactsActions, ContactsStates } from './presentation/redux/Contacts'
import { MinistryMgmtActions, MinistryMgmtStates } from './presentation/redux/MinistryMgmt'
import { ErrorActions } from './presentation/redux/Errors'

import { LoadingIndicator } from './presentation/components/Foundation'
import Styles from './presentation/style/Styles'

import WelcomeScreen from './presentation/screens/welcome/WelcomeScreen'
import HomeScreen from './presentation/screens/home/HomeScreen'
import AdminHomeScreen from './presentation/screens/home/AdminHomeScreen'

import handleError, { AUTH_ERROR, CONTACTS_ERROR, TIMEOUT_ERROR } from './utils/GlobalErrorHandler'

import { PAGE_HOME } from './core/analytics/AnalyticsConstants'
import { trackPage } from './core/analytics/AnalyticsInteractor'

trackPage(PAGE_HOME)

class App extends Component {
    static ERROR_SOURCE = 'App'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        this.props.listenForAuthChanges()
        this.routeToScreen()

        this.welcomeTimeout = setTimeout(() => {
            this.props.timeout(App.ERROR_SOURCE)
        }, 10000)
    }

    componentDidUpdate() {
        this.routeToScreen()
    }

    componentWillUnmount() {
        clearTimeout(this.welcomeTimeout)
        this.props.stopListeningForAuthChanges()
    }

    render() {
        return (
            <View style={Styles.centeredRootContainer}>
                <LoadingIndicator />
            </View>
        )
    }

    routeToScreen = () => {
        const { user, hasCheckedAuth, ministry, contactsState, contacts, logInError, contactsError, genericError } = this.props

        if (!hasCheckedAuth) {
            return
        }

        if (user == null) {
            // Not logged in --> go to welcome screen
            this.goToWelcome()
        } else if (ministry.ministryState == MinistryMgmtStates.NOT_READY) {
            // Logged in; update ministry status
            this.props.refreshMinistryStatus(user)
        } else if (ministry.ministryState == MinistryMgmtStates.REFRESHING) {
            // do nothing
        } else if (ministry.isAdmin) {
            // Go to ministry admin page
            this.goToAdminHome()
        } else if (contacts && contacts.length) {
            // Logged in & has contacts --> go to home screen
            this.goToHome()
        } else if (contactsState == ContactsStates.NOT_READY) {
            // Logged in, but has not checked for contacts --> check first
            this.props.checkForContacts(user.uid)
        } else if (contactsState !== ContactsStates.LOADING) {
            // Logged in, already checked for contacts, no contacts
            this.goToWelcome()
        }

        if (logInError != null || contactsError != null || genericError.error != null) {
            if (logInError != null) handleError(AUTH_ERROR, logInError)
            if (contactsError != null) handleError(CONTACTS_ERROR, contactsError)
            if (genericError.error != null) handleError(TIMEOUT_ERROR, genericError.error)

            // Just go to welcome screen in the current state
            this.goToWelcome()
        }
    }

    hasUserWithContacts = () => {
        const { user, contacts } = this.props
        return user !== null && contacts !== null && contacts.length > 0
    }

    goToWelcome = () => {
        clearTimeout(this.welcomeTimeout)
        this.props.navigation.replace(WelcomeScreen.KEY)
    }

    goToHome = () => {
        clearTimeout(this.welcomeTimeout)
        this.props.navigation.replace(HomeScreen.KEY)
    }

    goToAdminHome = () => {
        clearTimeout(this.welcomeTimeout)
        this.props.navigation.replace(AdminHomeScreen.KEY)
    }
}

const mapStateToProps = state => {
    return {
        hasCheckedAuth: state.logIn.hasCheckedAuth,
        user: state.logIn.user,
        logInState: state.logIn.logInState,
        logInError: state.logIn.error,
        contactsError: state.contacts.error,
        contactsState: state.contacts.contactsState,
        genericError: { error: state.errors.lastError, errorSource: state.errors.lastErrorSource },
        contacts: state.contacts.contacts,
        ministry: state.ministry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkForLogIn: () => dispatch(LogInActions.checkForLogIn()),
        listenForAuthChanges: () => dispatch(LogInActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(LogInActions.stopListeningForAuthChanges()),
        checkForContacts: (uid) => dispatch(ContactsActions.refreshContacts(uid)),
        refreshMinistryStatus: (user) => dispatch(MinistryMgmtActions.refreshMinistryStatus(user)),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    }
}

const appNavigator = createAppNavigator(
    connect(mapStateToProps, mapDispatchToProps)(App)
)

const appContainer = createAppContainer(appNavigator);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export default codePush(codePushOptions)(appContainer)