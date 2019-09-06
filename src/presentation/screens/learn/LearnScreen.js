/**
 * Intro videos
 */

import React, { Component } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';


import { Content, Button, Text } from 'native-base'
import ThemedContainer from '../../components/ThemedContainer'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons'

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
            <ThemedContainer>
                <Header
                    title='Learn'
                    goBackFunction={() => { this.props.navigation.goBack() }}
                    exitInsteadOfBack={true} />
                <Content>
                    <View style={{ height: 250, backgroundColor: 'black' }}>
                        <WebView
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: `https://player.vimeo.com/video/${videoId}` }}
                            useWebKit={true}
                            style={{ backgroundColor: 'black' }}
                        />
                    </View>
                    <Button
                        bordered
                        transparent
                        light
                        full
                        onPress={ this.nextVideo }
                        iconRight>
                            <Text style={{color: 'white'}}>{buttonText}</Text>
                            <Icon name={buttonIcon} size={25} color='white' />
                    </Button>
                </Content>
            </ThemedContainer>
        )
    }
}