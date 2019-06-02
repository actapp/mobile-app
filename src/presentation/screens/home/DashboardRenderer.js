import React from 'react'

import { View, TouchableOpacity } from 'react-native'

import {
    Header,
    Title,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Text
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'

import OptionsMenu from "react-native-options-menu";

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
    component
}) {
    const activeTab = component.state.activeTabIndex
    const content = renderTab(activeTab)

    return (
        <HeaderlessRootContainer
            headerContent={header(ministry.data.name)}
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

function header(ministryName) {
    /*
        Flex 3 allows the title to be longer
    */

    return (
        <Header iosBarStyle="light-content">
            <Left />
            <Body style={{ flex: 3 }}>
                <Title>{ministryName}</Title>
            </Body>
            <Right>
                {renderOptionsIcon(['Learn more', 'About'], [() => { }, () => { }])}
            </Right>
        </Header>
    )
}

function renderOptionsIcon(options, optionActions) {
    return (
        <OptionsMenu
            customButton={<Icon name={PlatformIcons.name('more')} size={25} color='white' style={{ marginRight: 20 }} />}
            options={options}
            actions={optionActions} />
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