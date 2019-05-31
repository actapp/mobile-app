import React, { Component } from 'react'

import SharePageConnect from './SharePageConnect'

import { withNavigation } from 'react-navigation'

import renderShareContent from './SharePageRenderer'
import { ContactsStatus } from '../../../redux/Contacts';

class SharePage extends Component {
    componentDidMount = () => {
        if (this.props.contacts.status == ContactsStatus.NOT_READY) {
            this.props.fetch(this.props.account.data.id)
        }
    }

    render = () => renderShareContent({
        contacts: this.props.contacts,
        onContactClicked: this.onContactClicked,
        onContactMessageClicked: this.onContactMessageClicked,
        onShareNowClicked: this.onShareNowClicked
    })

    onContactClicked = (contact) => {

    }

    onContactMessageClicked = (contact) => {

    }

    onShareNowClicked = () => {

    }
}

export default SharePageConnect.connect(withNavigation(SharePage))