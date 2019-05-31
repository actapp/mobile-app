import React, { Component } from 'react'

import SharePageConnect from './SharePageConnect'

import { withNavigation } from 'react-navigation'

import renderShareContent from './SharePageRenderer'

class SharePage extends Component {
    componentDidMount = () => {
        console.log('Comp mounted')
        console.log(this.props.contacts)
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