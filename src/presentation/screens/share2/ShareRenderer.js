import React from 'react'

import { ShareStatus } from '../../redux/Share2';

import { Content, Button, Footer, FooterTab, Text } from 'native-base'
import ThemedContainer from '../../components/ThemedContainer'
import Header from '../../components/Header'
import { LoadingIndicator } from '../../components/Foundation'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlatformIcons } from '../../style/Icons'

export default function renderContent({
    shareStatus,
    progress,
    onTipPressed,
    onBackPressed,
    onForwardPressed,
    onExitShare
}) {
    let content = null
    let title = ''
    let tipButton = null
    let footer = null
    if (shareStatus == ShareStatus.PROGRESS_UPDATED) {
        content = renderShareContent(progress.step)
        title = progress.step.title
        tipButton = rightHeaderTipButton(progress.step, onTipPressed)
        footer = footerNavigation({
            progress,
            onBackPressed,
            onForwardPressed
        })
    } else {
        content = loading()
    }

    return (
        <ThemedContainer>
            <Header
                title={title}
                goBackFunction={onExitShare}
                exitInsteadOfBack={true}
                customRightContent={tipButton} />
            <Content>
                {content}
            </Content>
            {footer}
        </ThemedContainer>
    )
}

function rightHeaderTipButton(step, onTipPressed) {
    if (!step.comments || !step.comments.length || step.comments.length < 1) {
        return null
    }

    return (
        <Button
            iconRight
            light
            transparent
            onPress={() => { onTipPressed(step.comments) }}>
            <Icon
                name={PlatformIcons.name('help-circle')}
                color='white'
                size={25}
                style={{ paddingLeft: 10 }}
            />
        </Button>
    )
}

function loading() {
    return <LoadingIndicator />
}

function renderShareContent(step) {
    return (
        <Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

        </Content>
    )
}

function footerNavigation({
    progress,
    onBackPressed,
    onForwardPressed
}) {
    return (
        <Footer style={{ justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 , paddingTop: 2, paddingBottom: 10}}>

            {backButton(progress.canGoBack, onBackPressed)}
            {forwardButton(progress.canGoForward, onForwardPressed)}

        </Footer>
    )
}

function backButton(enabled, onBackPressed) {
    return (
        <Button
            transparent
            light
            veritcal={false}
            iconLeft
            onPress={onBackPressed}>
            <Icon name={PlatformIcons.name('arrow-back')} color='white' size={25} />
            <Text style={{ color: 'white' }}>Back</Text>
        </Button>
    )
}

function forwardButton(enabled, onForwardPressed) {
    return (
        <Button
            transparent
            light
            iconRight
            veritcal={false}
            onPress={onForwardPressed}>
            <Text style={{ color: 'white' }}>Next</Text>
            <Icon name={PlatformIcons.name('arrow-forward')} color='white' size={25} />
        </Button>
    )
}