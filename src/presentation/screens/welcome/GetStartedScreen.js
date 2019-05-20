import React, { Component } from 'react'
import { View, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Text, StyleProvider } from 'native-base';
import getTheme from '../../../../native-base-theme/components';

import * as Animatable from 'react-native-animatable';

import Styles from '../../style/Styles'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Colors from '../../style/Colors';

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

    handleSubtitleRef = ref => this.subtitleView = ref
    handleStartDashboardRef = ref => this.startDashboardView = ref

    fadeInSubtitle = () => this.subtitleView.fadeIn(1500)
    fadeOutSubtitle = () => this.subtitleView.fadeOut(1500)

    flipSubtitle = () => {
        if (this.state.currentSubtitle < 0) {
            this.setState({ currentSubtitle: 0 })
            this.fadeInSubtitle()
            this.flipSubtitle()
            return
        } else if (this.state.currentSubtitle == this.state.subtitles.length - 1) {
            // Next flow

            return
        }

        setTimeout(() => {
            this.fadeOutSubtitle()
                .then(() => {
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
                })
        }, 3000)
    }

    enableAndFadeInStartDashboard = () => {
        this.setState({ showStartDashboard: true })
        this.startDashboardView.fadeIn(1500)
    }

    componentDidMount() {

    }

    render() {
        let subtitleView = null
        if (this.state.currentSubtitle >= 0) {
            let subtitle = this.state.subtitles[this.state.currentSubtitle]
            subtitleView = (
                <Animatable.Text
                    ref={this.handleSubtitleRef}
                    style={{ ...Styles.bigHeaderSubtitle, marginBottom: 50 }}
                >
                    {subtitle}
                </Animatable.Text>
            )
        }

        let startDashboardView = null
        if (this.state.showStartDashboard) {
            startDashboardView = (
                <Animatable.View
                    ref={this.handleStartDashboardRef}
                    style={{ ...Styles.horizontallyContentContainer }}
                >
                    <Button block bordered light style={{ borderColor: Colors.primary, paddingLeft: 50, paddingRight: 50, marginBottom: 10 }}>
                        <Text>
                            Share the Gospel
                        </Text>
                    </Button>
                    <Button block bordered light style={{ borderColor: Colors.primary, marginBottom: 10 }}>
                        <Text>
                            Lead a ministry
                        </Text>
                    </Button>
                    <Button block bordered light style={{ borderColor: Colors.primary }}>
                        <Text>
                            Learn more
                        </Text>
                    </Button>
                </Animatable.View>
            )
        }

        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <Content contentContainerStyle={{ ...Styles.rootContainer, paddingTop: 20, width: '100%' }}>
                        <Animatable.Image
                            source={require('../../../assets/ic_logo.png')}
                            style={{
                                width: 80,
                                height: 80
                            }}
                            animation="fadeInUp"
                            duration={2000} />
                        <Animatable.Text
                            style={{ ...Styles.bigHeader, marginBottom: 50 }}
                            animation="fadeInUp"
                            duration={2000}
                            onAnimationEnd={
                                () => {
                                    this.flipSubtitle()
                                }
                            }
                        >
                            MySharePal
                        </Animatable.Text>


                        <View style={Styles.horizontallyCenteredContentContainer}>
                            {subtitleView}
                            {startDashboardView}
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}