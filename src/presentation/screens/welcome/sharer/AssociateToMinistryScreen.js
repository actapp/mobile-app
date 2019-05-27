import React, { Component } from 'react'

import ATMConnect from './ATMConnect'

import renderContent from './ATMRenderer'

import handleError from '../../../../utils/GlobalErrorHandler'
import { alertError } from '../../../alerts/Alerts'
import { ASSOCIATE_ACCOUNT_ERROR } from '../../../../utils/GlobalErrorHandler';
import { AccountStatus } from '../../../redux/Account';
import { resetToDashboardAction } from '../RoleBasedRouter'

class AssociateToMinistryScreen extends Component {
    static KEY = 'ATMScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidUpdate() {
        if (this.props.error != null) {
            handleError(ASSOCIATE_ACCOUNT_ERROR, this.props.error)
            alertError(this.props.error.message)
        }

        if (this.props.accountStatus == AccountStatus.ASSOCIATED) {
            // Account now associated
            this.props.navigation.dispatch(resetToDashboardAction(this.props.accountData.role))
        }
    }

    render() {
        return renderContent({
            accountStatus: this.props.accountStatus,
            onMinistryIdSubmitted: this.onMinistryIdSubmitted
        })
    }

    onMinistryIdSubmitted = (mid) => {
        this.props.associateAccount(this.props.uid, mid)
    }
}

export default ATMConnect.connect(AssociateToMinistryScreen)