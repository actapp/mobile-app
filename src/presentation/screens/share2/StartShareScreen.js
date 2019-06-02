import React, { Component } from 'react'

import StartShareConnect from './StartShareConnect'

import renderContent from './StartShareRenderer'

import { alertError } from '../../alerts/Alerts'

import { ContactsStatus } from '../../redux/Contacts';

import ShareScreen from './ShareScreen'

class StartShareScreen extends Component {
    static KEY = 'StartShareScreen'

    componentDidUpdate = () => {
        if (this.props.contactsStatus == ContactsStatus.ADD_ERROR) {
            alertError(this.props.contactsError.message)
            return
        }

        if (this.props.contactsStatus == ContactsStatus.ADDED) {
            // Contact was added, start session
            this.props.navigation.replace(ShareScreen.KEY)
            return
        }
    }

    render = () => renderContent({
        contactsStatus: this.props.contactsStatus,
        onContactAdded: this.onContactAdded,
        onBackPressed: this.onBackPressed
    })

    onContactAdded = (name, phone) => {
        this.props.addContact(this.props.account.id, name, phone)
    }

    onBackPressed = () => {
        this.props.navigation.goBack()
    }
}

export default StartShareConnect.connect(StartShareScreen)