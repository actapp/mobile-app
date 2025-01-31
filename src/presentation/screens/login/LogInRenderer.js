import React from 'react'
import { Form, Item, Input, Label, Text, Button } from 'native-base';
import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'
import { StaticHeader, subtitle } from '../../components/Welcome'
import { LoadingIndicator } from '../../components/Foundation'

import { AuthStatus } from '../../redux/Auth';

export default function renderContent({
    authStatus,
    onPhoneNumberSubmitted,
    onCodeSubmitted,
    onCancelPressed
}) {
    const content = contentAndSubtitle({ authStatus, onPhoneNumberSubmitted, onCodeSubmitted })

    return (
        <HeaderlessRootContainer style={{ paddingTop: 80, paddingLeft: 50, paddingRight: 50 }}>
            <StaticHeader style={{ marginBottom: 50 }} />
            {subtitle(content.subtitle, { width: '100%', marginBottom: 25 })}
            {content.body}
            {cancelButton(onCancelPressed, { marginTop: 15 })}
        </HeaderlessRootContainer>
    )
}

const inputState = {
    phoneNumber: null,
    code: null
}

function contentAndSubtitle({
    authStatus,
    onPhoneNumberSubmitted,
    onCodeSubmitted,
    onBackButtonPressed
}) {
    if (authStatus == AuthStatus.LOGGED_IN) {
        return { subtitle: 'Please wait...', body: accountLoading() }
    } else {
        switch (authStatus) {
            case AuthStatus.LOGGING_IN:
                return { subtitle: 'Authenticating...', body: authLoading() }
            case AuthStatus.AWAITING_CODE:
                return { subtitle: "We've texted you a 6-digit code. Please enter it below to confirm your phone number.", body: verifyCodeForm(onCodeSubmitted) }
            case AuthStatus.VERIFYING_CODE:
                return { subtitle: 'Verifying...', body: authLoading() }
            default:
                return { subtitle: 'Enter your phone number', body: signInForm(onPhoneNumberSubmitted, onBackButtonPressed) }
        }
    }
}

function authLoading() {
    return (
        <LoadingIndicator />
    )
}

function signInForm(onPhoneNumberSubmitted) {
    return (
        <Form style={{ width: '100%' }}>
            {phoneNumberInput(onPhoneNumberSubmitted)}
            {nextButton(onPhoneNumberSubmitted)}
        </Form>
    )
}

function verifyCodeForm(onCodeSubmitted) {
    return (
        <Form style={{ width: '100%' }}>
            {codeInput(onCodeSubmitted)}
            {verifyCodeButton(onCodeSubmitted)}
        </Form>
    )
}

function phoneNumberInput(onPhoneNumberSubmitted) {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 15 }}>
            <Label>10-digit phone number</Label>
            <Input
                maxLength={10}
                keyboardType={"numeric"}
                returnKeyType='done'
                returnKeyLabel='Sign in'
                onChangeText={phoneNumber => { inputState.phoneNumber = phoneNumber }}
                onSubmitEditing={(event) => { onPhoneNumberSubmitted(event.nativeEvent.text) }}
            />
        </Item>
    )
}

function nextButton(onPhoneNumberSubmitted) {
    return (
        <Button
            full
            primary
            onPress={() => { onPhoneNumberSubmitted(inputState.phoneNumber) }}>
            <Text style={{ color: 'white' }}>
                Sign in
            </Text>
        </Button>
    )
}

function codeInput(onCodeSubmitted) {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 15 }}>
            <Label>6-digit verification code</Label>
            <Input
                maxLength={6}
                keyboardType={"numeric"}
                returnKeyType='done'
                returnKeyLabel='Verify'
                onChangeText={code => { inputState.code = code }}
                onSubmitEditing={(event) => { onCodeSubmitted(event.nativeEvent.text) }}
            />
        </Item>
    )
}

function verifyCodeButton(onCodeSubmitted) {
    return (
        <Button
            full
            primary
            onPress={() => { onCodeSubmitted(inputState.code) }}>
            <Text style={{ color: 'white' }}>
                Verify
            </Text>
        </Button>
    )
}

function cancelButton(onCancelPressed, additionalStyling) {
    return (
        <Button
            full
            primary
            bordered
            style={additionalStyling}
            onPress={onCancelPressed}>
            <Text style={{ color: 'white' }}>
                Cancel
            </Text>
        </Button>
    )
}

function accountLoading() {
    return (
        <LoadingIndicator />
    )
}