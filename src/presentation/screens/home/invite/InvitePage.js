import React, { Component } from 'react'

import InvitePageConnect from './InvitePageConnect'

import { withNavigation } from 'react-navigation'

import renderContent from './InvitePageRenderer'

import { sendMessageWithBody } from '../../../../core/MessagingInteractor'

class InvitePage extends Component {
    static INVITE_MESSAGE = ''

    static ON_FOOTER_BUTTON_PRESSED = (ministryId) => {
        sendMessageWithBody(null, ministryId)
    }

    render = () => renderContent({
        ministryId: this.props.ministry.data.id,
        ministryName: this.props.ministry.data.name
    })
}

export default InvitePageConnect.connect(withNavigation(InvitePage))