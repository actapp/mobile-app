import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PropTypes } from 'prop-types';
import { Colors, CommonStyles } from '../Styles'

export class WizardButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        iconOnRight: PropTypes.bool,
        iconComponent: PropTypes.object,
        enabled: PropTypes.bool,
        onPress: PropTypes.func
    }

    static defaultProps = {
        iconOnRight: false,
        enabled: true
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { label, iconOnRight, iconComponent, enabled, onPress } = this.props

        let buttonColor = styles.wizardButton.borderColor
        if (!enabled) {
            buttonColor = Colors.grayedOut
        }

        let leftIcon = null
        let rightIcon = null
        if (iconComponent !== null) {
            if (!iconOnRight) {
                leftIcon = iconComponent
            } else {
                rightIcon = iconComponent
            }
        }

        return (<TouchableOpacity
            onPress={onPress}
            style={{ ...styles.wizardButton, borderColor: buttonColor }}
            disabled={!enabled}
            key={onPress}>
            {leftIcon}
            <Text style={{ ...styles.wizardButtonText, color: buttonColor }}>{label}</Text>
            {rightIcon}
        </TouchableOpacity>)
    }
}

export class LoadingIndicator extends Component {
    render() {
        return <ActivityIndicator size="large" color={Colors.primary} />
    }
}

export function alertError(msg) {

}

const styles = StyleSheet.create({
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