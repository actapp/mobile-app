import React, { Component } from 'react'

import SharePageConnect from './SharePageConnect'

import { withNavigation } from 'react-navigation'

import renderShareContent from './SharePageRenderer'
import { ContactsStatus } from '../../../redux/Contacts';
import StartShareScreen from '../../share2/StartShareScreen';
import ShareScreen from '../../share2/ShareScreen';

class SharePage extends Component {
    static ON_FOOTER_BUTTON_PRESSED = (navigation) => {
        navigation.navigate(StartShareScreen.KEY)
    }

    componentDidMount = () => {
        if (this.props.contacts.status == ContactsStatus.NOT_READY) {
            this.props.fetch(this.props.account.data.id)
        }
    }

    render = () => renderShareContent({
        contacts: this.props.contacts,
        onContactClicked: this.onContactClicked,
        onContactMessageClicked: this.onContactMessageClicked
    })

    onContactClicked = (contact) => {
        this.props.navigation.navigate(ShareScreen.KEY)
    }

    onContactMessageClicked = (contact) => {
        // TODO
    }
}

export default SharePageConnect.connect(withNavigation(SharePage))