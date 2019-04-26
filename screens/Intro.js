/**
 * Intro videos
 */

import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WizardButton } from '../components/Foundation'
import { PlatformIcons, CommonStyles } from '../Styles'
import { setVideosSeen } from '../data/IntroInteractor'

export default class Intro extends Component {
    static navigationOptions = {
        title: 'Welcome'
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
            buttonIcon = <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' style={{ marginLeft: 10 }} />
        }

        return (
            <View style={styles.container}>
                <View style={{ height: 250, width: '100%' }}>
                    <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: `https://player.vimeo.com/video/${videoId}` }}
                        style={{ backgroundColor: 'black' }}
                    />
                </View>
                <WizardButton label={buttonText} style={{ width: '90%' }} onPress={this.nextVideo} iconOnRight={true} iconComponent={buttonIcon} />
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
