import React, { Component } from 'react'
import ShareConnect from './ShareConnect';
import renderContent from './ShareRenderer';

class ShareScreen extends Component {
    static KEY = 'ShareScreen'

    render = () => renderContent()
}

export default ShareConnect.connect(ShareScreen)