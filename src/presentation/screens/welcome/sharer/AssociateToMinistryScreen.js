import React, { Component } from 'react'

import ATMConnect from './ATMConnect'

import renderContent from './ATMRenderer'

import handleError, { GET_MINISTRY_ERROR } from '../../../../utils/GlobalErrorHandler'
import { alertError } from '../../../alerts/Alerts'
import handleUnknownState from '../../utils/UnknownStateErrorHandler'

import { ASSOCIATE_ACCOUNT_ERROR } from '../../../../utils/GlobalErrorHandler';
import { AccountStatus } from '../../../redux/Account';

import { buildResetToRouteAction } from '../../../../AppNavigator'
import { MinistryStatus } from '../../../redux/Ministry';
import DashboardScreen from '../../home/DashboardScreen';

class AssociateToMinistryScreen extends Component {
    static KEY = 'ATMScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidUpdate() {
        this.handleState()
    }

    render() {
        return renderContent({
            accountStatus: this.props.accountStatus,
            ministryStatus: this.props.ministryStatus,
            onMinistryIdSubmitted: this.onMinistryIdSubmitted
        })
    }

    onMinistryIdSubmitted = (mid) => {
        this.props.associateAccount(this.props.uid, mid)
    }

    handleState = () => {
        if (this.props.accountError != null) {
            handleError(ASSOCIATE_ACCOUNT_ERROR, this.props.account.error)
            alertError(this.props.account.error.message)
        }

        if (this.props.ministryError != null) {
            handleError(GET_MINISTRY_ERROR, this.props.ministry.error)
            alertError(this.props.ministry.error.message)
        }

        if (this.props.accountStatus == AccountStatus.ASSOCIATED) {
            this.handleAccountAssociated()
        }
    }

    handleAccountAssociated = () => {
        // Account now associated--fetch the ministry data
        switch (this.props.ministryStatus) {
            case MinistryStatus.NOT_READY:
                this.props.fetchMinistry(this.props.accountData.ministryId)
                break
            case MinistryStatus.READY:
                this.props.navigation.dispatch(buildResetToRouteAction(DashboardScreen.KEY))
                break
            case MinistryStatus.GETTING:
                // Do nothing
                break
            case MinistryStatus.ERROR:
                // Ignore; was handled above
                break
            default:
                handleUnknownState(this.props.ministryStatus, 'ATMScreen')
                break
        }
    }
}

export default ATMConnect.connect(AssociateToMinistryScreen)