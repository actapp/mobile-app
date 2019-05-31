import React, { Component } from 'react'

import InvitePageConnect from './InvitePageConnect'

import { withNavigation } from 'react-navigation'

import renderContent from './InvitePageRenderer'

class InvitePage extends Component {
    componentDidMount = () => {
        console.log(this.props)
    }

    render = () => renderContent({
        ministryId: this.props.ministry.data.id,
        ministryName: this.props.ministry.data.name,
        onInviteClicked: this.onInviteClicked
    })

    onInviteClicked = () => {

    }
}

export default InvitePageConnect.connect(withNavigation(InvitePage))