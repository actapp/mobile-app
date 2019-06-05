import React, { Component } from 'react'

import InvitePageConnect from './InvitePageConnect'

import { withNavigation } from 'react-navigation'

import renderContent from './InvitePageRenderer'

import { sendMessageWithBody } from '../../../../core/MessagingInteractor'

class InvitePage extends Component {
    static INVITE_MESSAGE = ''

    static ON_FOOTER_BUTTON_PRESSED = (ministryId) => {
        sendMessageWithBody('', ministryId)
    }

    render = () => renderContent(this.props.ministry)
}

export default InvitePageConnect.connect(withNavigation(InvitePage))