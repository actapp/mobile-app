import React from 'react'

import { View } from 'react-native'

import {
    Footer,
    FooterTab,
    Button,
    Text
} from 'native-base'

import Header from '../../components/Header'

import Icon from 'react-native-vector-icons/Ionicons'

import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'

import { PlatformIcons } from '../../style/Icons'
import Colors from '../../style/Colors';

import StatsPage from './stats/StatsPage';
import SharePage from './share/SharePage';
import InvitePage from './invite/InvitePage';

export const TABS = {
    STATS: {
        index: 0,
        label: 'Stats',
        iconName: PlatformIcons.name('stats'),
        component: <StatsPage />
    },
    SHARE: {
        index: 1,
        label: 'Share',
        iconName: PlatformIcons.name('chatbubbles'),
        component: <SharePage />
    },
    INVITE: {
        index: 2,
        label: 'Invite',
        iconName: PlatformIcons.name('people'),
        component: <InvitePage />
    }
}

export default function renderContent({
    ministry,
    component,

    // Options to show in options menu
    // Should be an array of objects, with two properties: name and action
    options
}) {
    const activeTab = component.state.activeTabIndex
    const content = renderTab(activeTab)

    return (
        <HeaderlessRootContainer
            headerContent={header(ministry.data.name, options)}
            footerContent={footer(activeTab, component, renderAdditionalFooterContent(activeTab, component.props.navigation, ministry.data.id))}
            style={{ alignItems: null }}>
            {content}
        </HeaderlessRootContainer>
    )
}

function renderTab(activeTabIndex) {
    return Object.keys(TABS).map(key => TABS[key])[activeTabIndex].component
}


/**
 * Will appear on top of tab bar
 */
function renderAdditionalFooterContent(activeTabIndex, navigation, ministryId) {
    if (activeTabIndex == TABS.SHARE.index) {
        return topFooterButton('Share now', () => { SharePage.ON_FOOTER_BUTTON_PRESSED(navigation) }, <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' />)
    } else if (activeTabIndex == TABS.INVITE.index) {
        return topFooterButton('Send code', () => { InvitePage.ON_FOOTER_BUTTON_PRESSED(ministryId) })
    }

    return null
}

function topFooterButton(label, onPress, iconComponent) {
    return (
        <Button
            full
            primary
            iconRight
            style={{ height: 55 }}
            onPress={onPress}>
            <Text style={{ color: 'white' }}>{label}</Text>
            {iconComponent}
        </Button>
    )
}

function header(ministryName, options) {
    return (
        <Header
            title={ministryName}
            options={options}
        />
    )
}

function footer(activeTabIndex, component, additionalFooterContent) {
    return (
        <View style={{ width: '100%' }}>
            {additionalFooterContent}
            <Footer>
                <View style={{ height: 10 }} />
                <FooterTab>
                    {footerTabButtons(activeTabIndex, component)}
                </FooterTab>
            </Footer>
        </View>
    )
}

function footerTabButtons(activeTabIndex, component) {
    return Object.keys(TABS)
        .map(key => TABS[key])
        .map((tab, index) => ({
            ...tab,
            key: tab.label + index,
            isActive: (activeTabIndex == index),
            onPress: () => { component.setState({ activeTabIndex: index }) }
        }))
        .map(tab => footerTabButton(tab))
}

function footerTabButton({
    key,
    label,
    iconName,
    isActive,
    onPress
}) {
    let textAndIconColor = 'white'
    if (isActive) {
        textAndIconColor = Colors.primary
    }

    return (
        <Button
            key={key}
            vertical
            active={isActive}
            onPress={onPress}
        >
            <Icon name={iconName} color={textAndIconColor} size={25} />
            <Text style={{ color: textAndIconColor }}>{label}</Text>
        </Button>
    )
}