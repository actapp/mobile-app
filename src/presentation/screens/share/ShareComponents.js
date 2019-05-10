import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { WizardButton, LoadingIndicator } from '../../components/Foundation'
import Icon from 'react-native-vector-icons/Ionicons'

import Styles from '../../style/Styles'
import { PlatformIcons } from '../../style/Icons'

import { alert } from '../../alerts/Alerts'

export function renderUpButton(onPressed) {
    return (
        <TouchableOpacity
            onPress={onPressed}>
            <Icon name={PlatformIcons.name('arrow-back')} size={25} color='white' style={{ marginLeft: 15 }} />
        </TouchableOpacity>
    )
}

export function renderTipButton(tipContent) {
    return (
        <TouchableOpacity
            onPress={() => {
                alert('Tip', tipContent)
            }}>
            <Icon name={PlatformIcons.name('help-circle')} size={25} color='white' style={{ marginRight: 15 }} />
        </TouchableOpacity>
    )
}

export function renderLoadingSteps(screenComp) {
    return (
        <View style={Styles.centeredRootContainer}>
            <LoadingIndicator />
        </View>
    )
}

export function renderStepContent(step, goBackFunc, goNextFunc, screenComp) {
    return (
        <View style={Styles.rootContainer}>
            {renderStepLines(step)}
            {renderNavigation(goBackFunc, goNextFunc)}
        </View>
    )
}

function renderStepLines(step) {
    return (
        <ScrollView contentContainerStyle={styles.stepBodyScrollViewContent}>
            {lineItemsToTexts(step)}
        </ScrollView>
    )
}

function lineItemsToTexts(step) {
    const { lineItems } = step
    const texts = []

    let alignment = step.alignment
    if (alignment == null) {
        alignment = 'left'
    }

    for (let i = 0; i < lineItems.length; i++) {
        const itemKey = step.key + "_" + i
        let marginBottom = 25
        if (i == lineItems.length - 1) {
            marginBottom = 0
        }

        texts.push(
            <Text key={itemKey} style={{ ...styles.stepText, textAlign: alignment, marginBottom: marginBottom }}>
                {lineItems[i]}
            </Text>
        )
    }

    return texts
}

function renderNavigation(goBackFunc, goNextFunc) {
    return (
        <View style={styles.navigation}>
            {renderNavButton(goBackFunc, 'Back', false, PlatformIcons.name('arrow-back'))}
            {renderNavButton(goNextFunc, 'Next', true, PlatformIcons.name('arrow-forward'))}
        </View>
    )
}

function renderNavButton(onPress, label, iconOnRight, iconName) {
    return (
        <WizardButton
            style={styles.navButton}
            onPress={onPress}
            label={label}
            iconOnRight={iconOnRight}
            iconName={iconName}
            disabled={onPress == null}
        />
    )
}

const styles = StyleSheet.create({
    stepBodyScrollView: {
        height: '90%'
    },
    stepBodyScrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    stepText: {
        color: 'white',
        fontSize: 20
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderTopWidth: 0.5,
        borderColor: 'white',
    },
    navButton: {
        width: '60%'
    }
})