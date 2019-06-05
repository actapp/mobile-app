import React, { Component } from 'react'

import { Form, Item, Input, Label, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import HeaderlessRootContainer from '../../../components/HeaderlessRootContainer'
import { StaticHeader, subtitle } from '../../../components/Welcome'
import { LoadingIndicator } from '../../../components/Foundation'
import { AccountStatus } from '../../../redux/Account';

import { PlatformIcons } from '../../../style/Icons'
import { MinistryStatus } from '../../../redux/Ministry';

const inputState = {
    ministryId: null
}

export default function renderContent({
    accountStatus,
    ministryStatus,
    onMinistryIdSubmitted,
    onSkipPressed
}) {
    const content = contentAndSubtitle({
        accountStatus,
        ministryStatus,
        onMinistryIdSubmitted,
        onSkipPressed
    })

    return (
        <HeaderlessRootContainer style={{ paddingTop: 80, paddingLeft: 50, paddingRight: 50 }}>
            <StaticHeader style={{ marginBottom: 50 }} />
            {subtitle(content.subtitle, { width: '100%', marginBottom: 25 })}
            {content.body}
        </HeaderlessRootContainer>
    )
}

function contentAndSubtitle({
    accountStatus,
    ministryStatus,
    onMinistryIdSubmitted,
    onSkipPressed
}) {
    if (accountStatus == AccountStatus.SETTING_ASSOCIATION
        || ministryStatus == MinistryStatus.GETTING) {
        return { subtitle: 'Please wait...', body: loading() }
    }

    return {
        subtitle: 'Enter the 5-digit ministry code given to you by your ministry leader. It should look something like \"AB001\".',
        body: ministryIdForm(onMinistryIdSubmitted, onSkipPressed)
    }
}

function loading() {
    return (
        <LoadingIndicator />
    )
}

function ministryIdForm(onMinistryIdSubmitted, onSkipPressed) {
    return (
        <Form style={{ width: '100%' }}>
            {ministryIdInput(onMinistryIdSubmitted)}
            {nextButton(onMinistryIdSubmitted)}
            {skipButton(onSkipPressed, { marginTop: 15 })}
        </Form>
    )
}

function ministryIdInput(onMinistryIdSubmitted) {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 15 }}>
            <Label>Ministry code</Label>
            <Input
                maxLength={5}
                keyboardType={"default"}
                returnKeyType='done'
                returnKeyLabel='Next'
                autoCorrect={false}
                autoCapitalize={'characters'}
                onChangeText={ministryId => { inputState.ministryId = ministryId }}
                onSubmitEditing={(event) => { onMinistryIdSubmitted(event.nativeEvent.text) }}
            />
        </Item>
    )
}

function nextButton(onMinistryIdSubmitted) {
    return (
        <Button
            full
            primary
            iconRight
            onPress={() => { onMinistryIdSubmitted(inputState.ministryId) }}>
            <Text style={{ color: 'white' }}>
                Next
            </Text>
            <Icon name={PlatformIcons.name('arrow-forward')} color='white' size={25} />
        </Button>
    )
}

function skipButton(onSkipPressed, additionalStyling) {
    return (
        <Button
            full
            primary
            bordered
            style={additionalStyling}
            onPress={onSkipPressed}>
            <Text style={{ color: 'white' }}>
                Skip
            </Text>
        </Button>
    )
}