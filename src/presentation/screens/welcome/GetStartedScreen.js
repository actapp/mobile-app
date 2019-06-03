import React, { Component } from 'react'

import GetStartedConnect from './GetStartedConnect'

import renderContent, { subtitleViewRef, startOptionsViewRef } from './GetStartedScreenRenderer'

import LogInScreen from '../login/LogInScreen';

import AppConfig from '../../../AppConfig'
import { Roles } from '../../../core/account/AccountInteractor';
import LearnScreen from '../learn/LearnScreen';

class GetStartedScreen extends Component {
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

    animation = {
        fadeInSubtitle:
            () => subtitleViewRef.fadeIn(AppConfig.defaultAnimDuration()),
        fadeOutSubtitle:
            () => subtitleViewRef.fadeOut(AppConfig.defaultAnimDuration()),
        fadeInStartOptions:
            () => startOptionsViewRef.fadeIn(AppConfig.defaultAnimDuration())
    }

    flipSubtitle = () => {
        if (this.state.currentSubtitle < 0) {
            this.showFirstSubtitle()
            return
        } else if (this.state.currentSubtitle == this.state.subtitles.length - 1) {
            // Next flow
            return
        }

        setTimeout(() => {
            this.animation.fadeOutSubtitle()
                .then(this.onSubtitleFadedOut)
        },
            AppConfig.animDuration(3000)
        )
    }

    showFirstSubtitle = () => {
        this.setState({ currentSubtitle: 0 })
        this.animation.fadeInSubtitle()
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
        this.animation.fadeInSubtitle().then(onFadeIn)

        if (willShowLastSubtitle) {
            this.enableAndFadeInStartDashboard()
        }
    }

    enableAndFadeInStartDashboard = () => {
        this.setState({ showStartDashboard: true })
        this.animation.fadeInStartOptions()
    }

    render() {
        return renderContent({
            currentSubtitle: this.state.currentSubtitle,
            subtitles: this.state.subtitles,
            shouldShowStartOptions: this.state.showStartDashboard,
            onSubtitleReady: this.flipSubtitle,

            onStartSharer: () => { this.startLogInRoute(Roles.SHARER) },
            onStartAdmin: () => { this.startLogInRoute(Roles.LEADER) },
            onLearnMore: () => { this.props.navigation.navigate(LearnScreen.KEY) }
        })
    }

    startLogInRoute(intendedRole) {
        // Dispatch notifying the user intends a certain role so the flow can be adjusted after login/signup
        this.props.roleIntended(intendedRole)
        this.props.navigation.navigate(LogInScreen.KEY)
    }
}

export default GetStartedConnect.connect(GetStartedScreen)