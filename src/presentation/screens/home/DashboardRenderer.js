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
import SharePage from './contacts/SharePage';

export const TABS = {
    STATS: {
        index: 0,
        label: 'Stats',
        iconName: PlatformIcons.name('stats')
    },
    SHARE: {
        index: 1,
        label: 'Share',
        iconName: PlatformIcons.name('heart')
    }
}

export default function renderContent({
    ministry,
    stats,
    contacts,
    component
}) {
    const activeTab = component.state.activeTabIndex
    const content = renderTab(activeTab, stats, contacts)

    return (
        <HeaderlessRootContainer
            headerContent={header(ministry.data.name)}
            footerContent={footer(activeTab, component, renderAdditionalFooterContent(activeTab))}
            style={{ alignItems: null }}>
            {content}
        </HeaderlessRootContainer>
    )
}

function renderTab(activeTabIndex) {
    switch (activeTabIndex) {
        case TABS.STATS.index:
            return <StatsPage />
        case TABS.SHARE.index:
            return <SharePage />
        default:
            throw new Error('Unknown tab: ' + activeTabIndex)
    }
}


/**
 * Will appear on top of tab bar
 */
function renderAdditionalFooterContent(activeTabIndex) {
    if (activeTabIndex == TABS.SHARE.index) {
        return (
            <Button
                full
                primary
                iconRight
                style={{height: 55}}>
                    <Text style={{color: 'white'}}>Share now</Text>
                    <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' />
            </Button>
        )
    }

    return null
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
        <View style={{ width: '100%', }}>
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