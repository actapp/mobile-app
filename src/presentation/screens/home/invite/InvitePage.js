import React, { Component } from 'react'

import InvitePageConnect from './InvitePageConnect'

import { withNavigation } from 'react-navigation'

import renderContent from './InvitePageRenderer'

import { sendMessageWithBody } from '../../../../core/MessagingInteractor'

class InvitePage extends Component {
    static INVITE_MESSAGE = ''

    static ON_FOOTER_BUTTON_PRESSED = (ministryId) => {
        sendMessageWithBody('', `Download MySharePal Today!\nMinistry Code: ${ministryId}\n\nhttps://mysharepal.com`) //https://apps.apple.com/us/app/mysharepal/id1458785592
    }

    render = () => renderContent(this.props.ministry)
}

export default InvitePageConnect.connect(withNavigation(InvitePage))