import React, { Component } from 'react'
import { Footer, FooterTab, Form, Item, Input, Label, Text, Button } from 'native-base';
import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'
import { StaticHeader, subtitle } from '../../components/Welcome'

export default function renderContent({
    onPhoneNumberSubmitted
}) {
    return (
        <HeaderlessRootContainer style={{ paddingTop: 80, paddingLeft: 50, paddingRight: 50 }}>
            <StaticHeader style={{ marginBottom: 50 }} />
            {subtitle("Enter your phone number to get started.",
                { width: '100%' })}
            <Form style={{ width: '100%' }}>
                {phoneNumberInput(onPhoneNumberSubmitted)}
                {nextButton(onPhoneNumberSubmitted)}
            </Form>
        </HeaderlessRootContainer>
    )
}

const inputState = {
    phoneNumber: null
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
            onPress={onPhoneNumberSubmitted(inputState.phoneNumber)}>
            <Text style={{ color: 'white' }}>
                Sign in
            </Text>
        </Button>
    )
}