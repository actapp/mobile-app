import React, { Component } from 'react'

import ATMConnect from './ATMConnect'

import { validateMinistryId } from '../../../../core/account/AccountInteractor'

import renderContent from './ATMRenderer'

import { alertError } from '../../../alerts/Alerts'

class AssociateToMinistryScreen extends Component {
    static KEY = 'ATMScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return renderContent({
            accountStatus: this.props.accountStatus,
            onMinistryIdSubmitted: this.onMinistryIdSubmitted
        })
    }

    onMinistryIdSubmitted = (mid) => {
        try {
            validateMinistryId(mid)
            this.props.updateAccount(this.props.uid, { ...this.props.account, ministryId: mid })
        } catch (error) {
            alertError(error.message)
        }
    }
}

export default ATMConnect.connect(AssociateToMinistryScreen)