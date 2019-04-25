/**
 * Intro videos
 */

import React, { Component } from 'react';
import { WebView } from 'react-native';
import { withNavigation } from 'react-navigation';

class Intro extends Component {
    render() {
        // TODO
        return (
            <WebView source={{ uri: 'https://player.vimeo.com/video/8b2c319bd4' }} />
         )
     }
}

export default withNavigation(Intro);
