import React, { Component } from 'react'

import { connect } from 'react-redux'
import LogInConnect from './LogInConnect'

import renderContent from './LogInRenderer'

import { alertError } from '../../alerts/Alerts'
import { AuthStatus } from '../../redux/Auth';

class LogInScreen extends Component {
    static KEY = 'LogInScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        this.handleState()
    }

    componentDidUpdate() {
        this.handleState()
    }

    render() {
        return renderContent({
            authStatus: this.props.authStatus,

            onPhoneNumberSubmitted: this.onPhoneNumberSubmitted,
            onCodeSubmitted: this.onCodeSubmitted
        })
    }

    handleState = () => {
        this.checkLoggedIn()

        if (this.props.error != null) {
            alertError(this.props.error.message)
        }
    }

    checkLoggedIn = () => {
        if (this.props.authStatus == AuthStatus.LOGGED_IN) {
            // Go to next screen (should've been passed in navigation params)
            const nextScreen = this.props.navigation.getParam('postLoginScreenKey', null)
            this.props.navigation.replace(nextScreen)
        }
    }

    onPhoneNumberSubmitted = (phoneNumber) => {
        this.props.startPhoneLogIn(phoneNumber)
    }

    onCodeSubmitted = (code) => {
        this.props.verifyCode(code)
    }
}

export default connect(LogInConnect.mapStateToProps, LogInConnect.mapDispatchToProps)(LogInScreen)