import React from 'react'
import { KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import { View, Text, Button } from 'react-native-ui-lib';

import { LoadingIndicator } from '../../components/Foundation'

import Colors from '../../style/Colors'
import Styles from '../../style/Styles'

export function renderAwaitingContactsScreen() {
    console.log('awaiting contacts screen')
    return (
        <View style={Styles.centeredRootContainer}>
            <LoadingIndicator />
        </View>
    )
}

export function renderLoggedIn(screenComp) {
    return wrapInRootContainer(
        <>
            <Button
                label='Share now'
                style={{ ...styles.mainButton, marginBottom: 20 }}
                onPress={screenComp.onShareNowPressed} />

            {learnMore(screenComp)}
        </>
    )
}

export function renderAwaitingPhoneNumber(screenComp) {
    return wrapInRootContainer(
        <KeyboardAvoidingView style={{ width: '80%' }}>
            <TextInput
                key='phoneNumber'
                placeholder='10-digit phone number'
                placeholderTextColor='white'
                maxLength={10}
                keyboardType={"numeric"}
                returnKeyType='done'
                returnKeyLabel='Sign in'
                onSubmitEditing={(event) => { screenComp.onPhoneNumberSubmitted(event.nativeEvent.text) }}
                style={{ borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
        </KeyboardAvoidingView>
    )
}

export function renderAwaitingCode(screenComp) {
    return wrapInRootContainer(
        <KeyboardAvoidingView style={{ width: '80%' }}>
            <Text style={{ ...styles.authMessage, marginBottom: 15, textAlign: 'center' }}>
                We've sent you a 6 digit code via SMS. You should receive it shortly.
                    </Text>
            <TextInput
                key='confCode'
                placeholder='Enter your 6 digit code'
                placeholderTextColor='white'
                maxLength={10}
                keyboardType={"numeric"}
                returnKeyType='done'
                returnKeyLabel='Confirm'
                onSubmitEditing={(event) => { screenComp.onCodeSubmitted(event.nativeEvent.text) }}
                style={{ borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
        </KeyboardAvoidingView>
    )
}

export function renderAwaitingAuthStep(screenComp) {
    return (
        <View style={Styles.centeredRootContainer}>
            <LoadingIndicator />
            <Text style={styles.loadingMessage}>Authenticating...</Text>
        </View>
    )
}

export function renderLoggedOut(screenComp) {
    return wrapInRootContainer(
        <>
            <Button
                label='Sign in'
                style={{ ...styles.mainButton, marginBottom: 20 }}
                onPress={screenComp.onSignInPressed} />

            {learnMore(screenComp)}
        </>
    )
}

function learnMore(screenComp) {
    return (
        <Button
            label="Learn how to share"
            style={{ ...styles.secondaryButton }}
            onPress={screenComp.onLearnMorePressed} />
    )
}

function wrapInRootContainer(content) {
    return (
        <View style={styles.container}>
            <Text text10 style={{ fontSize: 48, fontWeight: '100', color: '#ffffff' }}>MySharePal</Text>
            <Text text10 style={{ fontSize: 18, color: '#ffffff', marginBottom: 20 }}>A Simple Way to Share the Gospel</Text>

            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    ...Styles,
    container: {
        ...Styles.rootContainer,
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    loadingMessage: {
        color: 'white',
        fontSize: 16
    },
    mainButton: {
        backgroundColor: Colors.primary,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 2,
        borderColor: Colors.primary,
        width: '70%'
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: 'black',
        width: '70%'
    },
    authMessage: {
        color: 'white',
        fontSize: 16
    }
});