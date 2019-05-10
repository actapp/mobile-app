/**
 * Intro videos
 */

import React, { Component } from 'react';

import { View, WebView, StyleSheet } from 'react-native';

import { WizardButton } from '../../components/Foundation'

import { PlatformIcons } from '../../style/Icons'

import { renderUpButton } from '../../screens/utils/HeaderComponents'

export default class LearnScreen extends Component {
    static KEY = 'LearnScreen'

    static navigationOptions = ({ navigation }) => {
        const goUp = () => { navigation.goBack() }

        return {
            title: 'Welcome',
            headerLeft: renderUpButton(goUp)
        }
    }

    state = {
        videos: [
            '331795562',
            '331807648',
            '331807942',
            '331808269'
        ],
        videoIndex: 0
    }

    nextVideo = () => {
        if (this.state.videoIndex == this.state.videos.length - 1) {
            this.props.navigation.goBack()
        } else {
            this.setState({ videoIndex: this.state.videoIndex + 1 })
        }
    }

    render() {
        const videoId = this.state.videos[this.state.videoIndex]
        const isLastVideo = this.state.videoIndex == this.state.videos.length - 1

        let buttonText = 'Next'
        let buttonIcon = null
        if (isLastVideo) {
            buttonText = 'Done'
        } else {
            buttonIcon = PlatformIcons.name('arrow-forward')
        }

        return (
            <View style={styles.container}>
                <View style={{ height: 250, width: '100%' }}>
                    <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: `https://player.vimeo.com/video/${videoId}` }}
                        useWebKit={true}
                        style={{ backgroundColor: 'black' }}
                    />
                </View>
                <WizardButton label={buttonText} style={{ width: '90%' }} onPress={this.nextVideo} iconOnRight={true} iconName={buttonIcon} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'black'
    }
})
