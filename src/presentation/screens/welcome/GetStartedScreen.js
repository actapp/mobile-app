import React, { Component } from 'react'
import renderContent, { subtitleViewRef, startOptionsViewRef } from './GetStartedScreenRenderer'

export default class GetStartedScreen extends Component {
    static KEY = 'GetStartedScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    state = {
        subtitles: [
            'A simple way to share the Gospel',
            'How do you want to start?'
        ],
        currentSubtitle: -1,
        showStartDashboard: false
    }

    fadeInSubtitle = () => subtitleViewRef.fadeIn(1000)
    fadeOutSubtitle = () => subtitleViewRef.fadeOut(1000)

    flipSubtitle = () => {
        if (this.state.currentSubtitle < 0) {
            this.showFirstSubtitle()
            return
        } else if (this.state.currentSubtitle == this.state.subtitles.length - 1) {
            // Next flow
            return
        }

        setTimeout(() => {
            this.fadeOutSubtitle()
                .then(this.onSubtitleFadedOut)
        }, 3000)
    }

    showFirstSubtitle = () => {
        this.setState({ currentSubtitle: 0 })
        this.fadeInSubtitle()
        this.flipSubtitle()
    }

    onSubtitleFadedOut = () => {
        const newIndex = this.state.currentSubtitle + 1
        const willShowLastSubtitle = newIndex == this.state.subtitles.length - 1
        let onFadeIn = null
        if (!willShowLastSubtitle) {
            onFadeIn = this.flipSubtitle
        }

        this.setState({ currentSubtitle: newIndex })
        this.fadeInSubtitle().then(onFadeIn)

        if (willShowLastSubtitle) {
            this.enableAndFadeInStartDashboard()
        }
    }

    enableAndFadeInStartDashboard = () => {
        this.setState({ showStartDashboard: true })
        startOptionsViewRef.fadeIn(1000)
    }

    render() {
        return renderContent({
            currentSubtitle: this.state.currentSubtitle,
            subtitles: this.state.subtitles,
            shouldShowStartOptions: this.state.showStartDashboard,
            onSubtitleReady: this.flipSubtitle,

            onStartSharer: () => { },
            onStartAdmin: () => { },
            onLearnMore: () => { }
        })
    }
}