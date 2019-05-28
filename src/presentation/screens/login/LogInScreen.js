import React, { Component } from 'react'

import { connect } from 'react-redux'
import LogInConnect from './LogInConnect'

import renderContent from './LogInRenderer'

import handleError, { AUTH_ERROR, GET_ACCOUNT_ERROR, GET_MINISTRY_ERROR } from '../../../utils/GlobalErrorHandler'
import handleUnknownState from '../utils/UnknownStateErrorHandler'
import { alertError } from '../../alerts/Alerts'
import { AuthStatus } from '../../redux/Auth';
import { AccountStatus } from '../../redux/Account';

import { Roles } from '../../../core/account/AccountInteractor';

import { StackActions, NavigationActions } from 'react-navigation'
import AssociateToMinistryScreen from '../welcome/sharer/AssociateToMinistryScreen';
import CreateMinistryScreen from '../welcome/leader/CreateMinistryScreen';
import HomeScreen from '../home/HomeScreen';
import AdminHomeScreen from '../home/AdminHomeScreen';
import { MinistryStatus } from '../../redux/Ministry';
import DashboardScreen from '../home/DashboardScreen';

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
            authStatus: this.props.auth.status,
            onPhoneNumberSubmitted: this.onPhoneNumberSubmitted,
            onCodeSubmitted: this.onCodeSubmitted,
            onCancelPressed: this.onCancelPressed
        })
    }

    handleState = () => {
        this.checkLoggedIn()

        if (this.props.auth.error != null) {
            this.handleError(AUTH_ERROR, this.props.auth.error.message)
        }

        if (this.props.account.error != null) {
            this.handleError(GET_ACCOUNT_ERROR, this.props.account.error.message)
        }

        if (this.props.ministry.error != null) {
            alertError(GET_MINISTRY_ERROR, this.props.ministry.error.message)
        }
    }

    checkLoggedIn = () => {
        if (this.props.auth.status == AuthStatus.LOGGED_IN) {
            this.handleAccount()
        }
    }

    handleAccount = () => {
        switch (this.props.account.status) {
            case AccountStatus.NOT_READY:
                this.props.fetchAccount(this.props.auth.user.uid)
                break
            case AccountStatus.NO_ACCOUNT:
                // First, create account
                this.props.createAccount(this.props.auth.user.uid, this.props.account.intendedRole)
                break
            case AccountStatus.CREATED_UNASSOCIATED:
            case AccountStatus.READY_UNASSOCIATED:
                // If account is not associated, now associate
                this.goToMinistryAssociationByRole(this.props.account.data.role)
                break
            case AccountStatus.READY:
            case AccountStatus.CREATED:
                this.handleAccountReady()
                break
        }
    }

    onPhoneNumberSubmitted = (phoneNumber) => {
        this.props.startPhoneLogIn(phoneNumber)
    }

    onCodeSubmitted = (code) => {
        this.props.verifyCode(code)
    }

    onCancelPressed = () => {
        this.props.navigation.goBack()
    }

    goToMinistryAssociationByRole(role) {
        console.log('Associating by role: ' + role)

        if (role == Roles.SHARER) {
            this.resetTo(AssociateToMinistryScreen.KEY)
        } else if (role == Roles.LEADER) {
            this.resetTo(CreateMinistryScreen.KEY)
        }
    }

    handleAccountReady = () => {
        const { account, ministry } = this.props
        switch(ministry.status) {
            case MinistryStatus.NOT_READY:
                this.props.fetchMinistry(account.data.ministryId)
                break
            case MinistryStatus.READY:
                this.resetTo(DashboardScreen.KEY)
                break
            case MinistryStatus.GETTING:
                // Do nothing
                break
            case MinistryStatus.ERROR:
                // Do nothing, already handled
                break
            default:
                handleUnknownState(ministry.status, 'LogInScreen')
                break
        }
    }

    resetTo(screenKey) {
        console.log('Resetting to ' + screenKey)

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screenKey })],
        });

        this.props.navigation.dispatch(resetAction);
    }

    handleError = (name, error) => {
        alertError(error.message)
        handleError(name, error, 'LogInScreen')
    }
}

export default connect(LogInConnect.mapStateToProps, LogInConnect.mapDispatchToProps)(LogInScreen)