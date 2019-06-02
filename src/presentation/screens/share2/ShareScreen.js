import React, { Component } from 'react'
import ShareConnect from './ShareConnect';
import renderContent from './ShareRenderer';
import { ShareStatus } from '../../redux/Share2';

import { alert } from '../../alerts/Alerts'

class ShareScreen extends Component {
    static KEY = 'ShareScreen'

    componentDidMount = () => {
        if(this.props.status == ShareStatus.NOT_READY) {
            this.props.fetch()
        }
    }

    componentDidUpdate = () => {
        if(this.props.error) {
            // TODO
        }

        if(this.props.status == ShareStatus.READY) {
            this.props.start()
        }
    }

    render = () => renderContent({
        shareStatus: this.props.status,
        progress: this.props.progress,
        onTipPressed: this.onTipPressed,
        onBackPressed: this.onBackPressed,
        onForwardPressed: this.onForwardPressed,
        onExitShare: this.onExitShare
    })

    onTipPressed = (tipContent) => {
        alert('Tip', tipContent)
    }

    onBackPressed = () => {
        if(this.props.progress.canGoBack) {
            this.props.goBack()
        } else {
            this.props.navigation.goBack()
        }
    }

    onForwardPressed = () => {
        if(this.props.progress.canGoForward) {
            this.props.goForward()
        } else {
            // TODO - finish session
        }
    }

    onExitShare = () => {
        // TODO - report metrics, ask why? etc.
        this.props.navigation.goBack() 
    }
}

export default ShareConnect.connect(ShareScreen)