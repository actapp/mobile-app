import React, { Component } from 'react'

import { connect } from 'react-redux'
import { LogInActions, LogInState } from '../../redux/LogIn'
import { ContactsActions, ContactsStates } from '../../redux/Contacts'

import { renderLoggedOut, renderAwaitingPhoneNumber, renderAwaitingCode, renderAwaitingAuthStep, renderLoggedIn, renderAwaitingContactsScreen } from './Containers'

import { alertError } from '../../alerts/Alerts'
import handleError, { AUTH_ERROR, CONTACTS_ERROR } from '../../../utils/GlobalErrorHandler'

import HomeScreen from '../home/HomeScreen'
import StartShareScreen from '../share/StartShareScreen'
import LearnScreen from '../learn/LearnScreen';

class WelcomeScreen extends Component {
    static KEY = 'WelcomeScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    state = {
        awaitingPhoneNumber: false
    }

    componentDidMount() {
        this.props.listenForAuthChanges()
    }

    componentDidUpdate() {
        const { logInState, uid, contactsState, contacts, logInError, contactsError } = this.props

        if (logInState == LogInState.LOGGED_IN) {
            if (contacts && contacts.length) {
                // Logged in & has contacts
                this.props.navigation.replace(HomeScreen.KEY)
            } else if (contactsState == ContactsStates.NOT_READY) {
                // User is logged in, but we haven't yet checked for contacts
                this.props.checkForContacts(uid)
            }

            // Else (user logged in, but either no contacts exist, or the contacts are currently being fetched)
            // --> do nothing
        }


        if (logInError != null) handleError(logInError)
        if (contactsError != null) handleError(contactsError)
    }

    componentWillUnmount() {
        this.props.stopListeningForAuthChanges()
    }

    render() {
        const { logInState, confirmation, contactsState } = this.props
        const { awaitingPhoneNumber } = this.state

        if (contactsState == ContactsStates.LOADING) {
            return renderAwaitingContactsScreen()
        }

        if (logInState == LogInState.LOGGED_IN) {
            return renderLoggedIn(this)
        } else if (logInState == LogInState.LOGGING_IN || logInState == LogInState.VERIFYING_CODE) {
            return renderAwaitingAuthStep(this)
        } else if (confirmation !== null) {
            return renderAwaitingCode(this)
        } else if (awaitingPhoneNumber) {
            return renderAwaitingPhoneNumber(this)
        } else {
            return renderLoggedOut(this)
        }
    }

    onShareNowPressed = () => this.props.navigation.navigate(StartShareScreen.KEY)
    onSignInPressed = () => this.setState({ awaitingPhoneNumber: true })

    /**
     * Assume U.S. country code
     */
    onPhoneNumberSubmitted = (mdn) => this.props.startPhoneLogIn('+1' + mdn)

    onCodeSubmitted = (code) => this.props.verifyCode(code, this.props.confirmation)

    onLearnMorePressed = () => this.props.navigation.navigate(LearnScreen.KEY)

    handleError(error) {
        alertError(error.message, 'Error')
        console.log(error)
        // TODO - report error
    }
}

const mapStateToProps = state => {
    return {
        confirmation: state.logIn.confirmation,
        logInState: state.logIn.logInState,
        uid: state.logIn.uid,
        logInError: state.logIn.error,
        contactsError: state.contacts.error,
        contacts: state.contacts.contacts,
        contactsState: state.contacts.contactsState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startPhoneLogIn: (mdn) => dispatch(LogInActions.startPhoneLogIn(mdn)),
        verifyCode: (code, confirmation) => dispatch(LogInActions.verifyCode(code, confirmation)),
        listenForAuthChanges: () => dispatch(LogInActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(LogInActions.stopListeningForAuthChanges()),
        checkForContacts: (uid) => dispatch(ContactsActions.refreshContacts(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)