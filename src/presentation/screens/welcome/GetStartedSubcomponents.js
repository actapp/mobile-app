import React from 'react'
import { Button, Text } from 'native-base';

import * as Animatable from 'react-native-animatable';

import Styles from '../../style/Styles'
import Colors from '../../style/Colors';

export default {
    renderHeaderImage: (onAnimationEnd) => {
        return applyStartAnimationProps(
            <Animatable.Image
                source={require('../../../assets/ic_logo.png')}
                style={{
                    width: 80,
                    height: 80
                }}
                onAnimationEnd={onAnimationEnd}
            />
        )
    },

    renderHeaderTitle: () => {
        return applyStartAnimationProps(
            <Animatable.Text
                style={{ ...Styles.bigHeader, marginBottom: 50 }}
            >
                MySharePal
            </Animatable.Text>
        )
    },

    renderSubtitleView: (subtitle, handleRef) => {
        return (
            <Animatable.Text
                ref={handleRef}
                style={{ ...Styles.bigHeaderSubtitle, marginBottom: 50 }}
            >
                {subtitle}
            </Animatable.Text>
        )
    },

    renderStartOptions: ({
        onStartSharer,
        onStartAdmin,
        onLearnMore
    }, handleRef) => {
        const buttonStyling = {
            marginBottom: 10
        }

        return (
            <Animatable.View
                ref={handleRef}
                style={{ ...Styles.horizontallyContentContainer }}
            >
                {renderStartSharerButton(buttonStyling, onStartSharer)}
                {renderStartAdminButton(buttonStyling, onStartAdmin)}
                {renderLearnMoreButton(null, onLearnMore)}
            </Animatable.View>
        )
    }
}

function renderStartSharerButton(styling, onStartSharer) {
    return renderStartButton({
        onPress: onStartSharer,
        label: 'Share the Gospel',

        // Create additional padding on left and right to expand width of container
        additionalStyling: { ...styling, paddingLeft: 50, paddingRight: 50 }
    })
}

function renderStartAdminButton(styling, onStartAdmin) {
    return renderStartButton({
        onPress: onStartAdmin,
        label: 'Lead a ministry',
        additionalStyling: styling
    })
}

function renderLearnMoreButton(styling, onLearnMore) {
    return renderStartButton({
        onPress: onLearnMore,
        label: 'Learn more',
        additionalStyling: styling
    })
}

function renderStartButton({ onPress, label, additionalStyling }) {
    return (
        <Button block bordered light
            style={{ ...additionalStyling, borderColor: Colors.primary }}
            onPress={onPress}>
            <Text>
                {label}
            </Text>
        </Button>
    )
}

function applyStartAnimationProps(component) {
    return React.cloneElement(
        component,
        {
            animation: 'fadeInUp',
            duration: 1100
        }
    )
}