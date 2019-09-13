import React from 'react'
import { View } from 'react-native';
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../../../../native-base-theme/components';


import Styles from '../../style/Styles'

import Subcomponents from './GetStartedSubcomponents'

export let subtitleViewRef = null
export let startOptionsViewRef = null

const handleSubtitleRef = ref => subtitleViewRef = ref
const handleStartOptionsRef = ref => startOptionsViewRef = ref

export default function renderContent({
    // State
    currentSubtitle,
    subtitles,
    shouldShowStartOptions,

    // Callbacks
    onSubtitleReady,
    onStartSharer,
    onStartAdmin,
    onLearnMore
}) {
    let subtitleView = null
    if (currentSubtitle >= 0) {
        const subtitle = subtitles[currentSubtitle]
        subtitleView = Subcomponents.renderSubtitleView(subtitle, handleSubtitleRef)
    }

    let startOptionsView = null
    if (shouldShowStartOptions) {
        startOptionsView = Subcomponents.renderStartOptions(
            { onStartSharer, onStartAdmin, onLearnMore },
            handleStartOptionsRef
        )
    }

    return renderRootView(subtitleView, startOptionsView, onSubtitleReady)
}

function renderRootView(subtitleView, startOptionsView, onSubtitleReady) {
    return (
        <StyleProvider style={getTheme()}>
            <Container style={{ backgroundColor: Colors.rootBackgroundColor}}>
                <Content contentContainerStyle={{ ...Styles.rootContainer, paddingTop: 80, width: '100%', flexWrap: 'nowrap' }}>
                    {Subcomponents.renderHeaderImage(onSubtitleReady)}
                    {Subcomponents.renderHeaderTitle()}
                    <View style={Styles.horizontallyCenteredContentContainer}>
                        {subtitleView}
                        {startOptionsView}
                    </View>
                </Content>
            </Container>
        </StyleProvider>
    )
}