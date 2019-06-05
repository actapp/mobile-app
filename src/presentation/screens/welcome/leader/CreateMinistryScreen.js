import React, { Component } from 'react'

import CMConnect from './CMConnect'

import renderContent from './CMRenderer'

import handleError from '../../../../utils/GlobalErrorHandler'
import { alertError } from '../../../alerts/Alerts'

import { CREATE_MINISTRY_ERROR, ASSOCIATE_ACCOUNT_ERROR } from '../../../../utils/GlobalErrorHandler';
import { AccountStatus } from '../../../redux/Account';
import { MinistryStatus } from '../../../redux/Ministry';

import { buildResetToRouteAction } from '../../../../AppNavigator'
import DashboardScreen from '../../home/DashboardScreen';

/**
 * 1.) Take ministry name
 * 2.) Create ministry (code, list of admins, etc.)
 * 3.) Create account
 * 4.) Associate account
 * 5.) Display ministry code for share
 */
class CreateMinistryScreen extends Component {
    static KEY = 'CMScreen'

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
            ministryStatus: this.props.ministryStatus,
            ministryData: this.props.ministryData,
            accountStatus: this.props.accountStatus,
            onMinistryNameSubmitted: this.onMinistryNameSubmitted,
            onDonePressed: this.onDonePressed
        })
    }

    onMinistryNameSubmitted = (name) => {
        this.props.createMinistry(name)
    }

    onDonePressed = () => {
        this.props.navigation.dispatch(buildResetToRouteAction(DashboardScreen.KEY))
    }

    handleState = () => {
        if (this.props.ministryError != null) {
            this.handleAndAlertError(CREATE_MINISTRY_ERROR, this.props.ministryError)
        }

        if (this.props.accountError != null) {
            this.handleAndAlertError(ASSOCIATE_ACCOUNT_ERROR, this.props.accountError)
        }

        if (this.props.ministryStatus == MinistryStatus.CREATED) {
            // Account exists but needs to be associated to the created ministry
            if (
                this.props.accountStatus == AccountStatus.READY_UNASSOCIATED
                || this.props.accountStatus == AccountStatus.CREATED_UNASSOCIATED
            ) {
                this.props.associateAccount(this.props.uid, this.props.ministryData.id)
            }
        }
    }

    handleAndAlertError(errorName, error) {
        handleError(errorName, error)
        alertError(error.message)
    }
}

export default CMConnect.connect(CreateMinistryScreen)