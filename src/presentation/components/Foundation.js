import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../style/Colors'

export class WizardButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        iconOnRight: PropTypes.bool,
        iconComponent: PropTypes.object,
        iconName: PropTypes.string,
        disabled: PropTypes.bool,
        onPress: PropTypes.func
    }

    static defaultProps = {
        iconOnRight: false,
        disabled: false
    }

    static styles = StyleSheet.create({
        wizardButton: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'black',
            borderWidth: 1,
            borderRadius: 2,
            borderColor: 'white'
        },
        wizardButtonText: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center'
        },
    })

    constructor(props) {
        super(props)
    }

    render() {
        const { label, iconOnRight, iconComponent, iconName, disabled, onPress } = this.props

        let buttonColor = WizardButton.styles.wizardButton.borderColor
        if (disabled) {
            buttonColor = Colors.disabled
        }

        let leftIcon = null
        let rightIcon = null
        if (iconName !== null) {
            if (!iconOnRight) {
                leftIcon = this.generateIcon(iconOnRight, iconName, buttonColor)
            } else {
                rightIcon = this.generateIcon(iconOnRight, iconName, buttonColor)
            }
        }

        return (
            <TouchableOpacity
                onPress={onPress}
                style={{ ...WizardButton.styles.wizardButton, borderColor: buttonColor }}
                disabled={disabled}
                key={onPress}>
                {leftIcon}
                <Text style={{ ...WizardButton.styles.wizardButtonText, color: buttonColor }}>{label}</Text>
                {rightIcon}
            </TouchableOpacity>)
    }

    generateIcon(isOnRight, iconName, color) {
        let marginRight = 0
        let marginLeft = 0
        if (isOnRight) {
            marginLeft = 10
        } else {
            marginRight = 10
        }

        return (
            <Icon name={iconName} size={20} color={color} style={{ marginLeft: marginLeft, marginRight: marginRight }} />
        )
    }
}

export class LoadingIndicator extends Component {
    render() {
        return <ActivityIndicator size="large" color={Colors.primary} />
    }
}