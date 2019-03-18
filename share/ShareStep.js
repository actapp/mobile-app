import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native-ui-lib';

class ShareStep extends React.Component {
    static propTypes = {
        onBackPress: PropTypes.func,
        onForwardPress: PropTypes.func,
        text: PropTypes.string
    }

    render() {
        const { text, onBackPress, onForwardPress } = this.props

    }
}

function renderNavBar(onBack, onNext) {
    const buttons = []
    if (onBack != null) {
        buttons.push(createNavButton("Back", onBack))
    }
    if (onNext != null) {
        buttons.push(createNavButton("Next", onNext))
    }

    return (
        <View style={styles.navContainer}>
            {buttons}
        </View>
    )
}

function createNavButton(text, onPress) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.navButton}
            key={onPress}>
            <Text style={styles.navButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}

function renderShareStep(text, navBar) {
    return (
        <View flex padding-10 style={styles.stepContainer}>
            <Text text10 style={styles.stepText}>{text}</Text>

            {navBar}
        </View>
    )
}

class ShareStep1 extends React.Component {
    state = {
        text: "Hello"
    }

    render() {
        return renderShareStep(this.state.text,
            renderNavBar(
                () => this.props.navigation.goBack(),
                () => {
                    this.props.navigation.navigate('ShareStep2')
                }))
    }
}

class ShareStep2 extends React.Component {
    state = {
        text: "Hello 2"
    }

    render() {
        return renderShareStep(this.state.text,
            renderNavBar(() => this.props.navigation.goBack(), null))
    }
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#000000',
    },
    navContainer: {
        width: '100%',
        height: '20%',
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    navButton: {
        width: 100,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        padding: 10
    },
    navButtonText: {
        color: '#000000',
        fontSize: 12,
        textAlign: 'center'
    },
    stepText: {
        width: '100%',
        height: '80%',
        color: '#ffffff',
        fontSize: 24
    }
})

export { ShareStep1, ShareStep2 };