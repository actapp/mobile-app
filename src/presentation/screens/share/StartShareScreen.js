import React, { Component } from 'react'

import StartShareConnect from './StartShareConnect'

import renderContent from './StartShareRenderer'

import { alertError } from '../../alerts/Alerts'

import { ContactsStatus } from '../../redux/Contacts';

import ShareScreen from './ShareScreen'

class StartShareScreen extends Component {
    static KEY = 'StartShareScreen'

    componentDidUpdate = () => {
        if (this.props.contacts.status == ContactsStatus.ADD_ERROR) {
            alertError(this.props.contacts.error.message)
            return
        }

        if (this.props.contacts.status == ContactsStatus.ADDED) {
            // Contact was added, start session
            // Added contact assumed to be the last in the list
            const addedContact = this.props.contacts.data[this.props.contacts.data.length - 1]
            this.props.navigation.replace(ShareScreen.KEY, {
                contact: addedContact,
                isFirstConvo: true
            })
            return
        }
    }

    render = () => renderContent({
        contactsStatus: this.props.contacts.status,
        onContactAdded: this.onContactAdded,
        onBackPressed: this.onBackPressed
    })

    onContactAdded = (name, phone) => {
        this.props.addContact(this.props.user.uid, name, phone)
    }

    onBackPressed = () => {
        this.props.navigation.goBack()
    }
}

export default StartShareConnect.connect(StartShareScreen)