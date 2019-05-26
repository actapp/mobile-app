import React, { Component } from 'react'

import { Form, Item, Input, Label, Text, Button } from 'native-base'
import HeaderlessRootContainer from '../../../components/HeaderlessRootContainer'
import { StaticHeader, subtitle } from '../../../components/Welcome'
import { LoadingIndicator } from '../../../components/Foundation'
import { AccountStatus } from '../../../redux/Account'
import { MinistryStatus } from '../../../redux/Ministry';

const inputState = {
    ministryName: null
}

export default function renderContent({
    ministryStatus,
    accountStatus,
    onMinistryNameSubmitted
}) {
    const content = contentAndSubtitle({ ministryStatus, accountStatus, onMinistryNameSubmitted })

    return (
        <HeaderlessRootContainer style={{ paddingTop: 80, paddingLeft: 50, paddingRight: 50 }}>
            <StaticHeader style={{ marginBottom: 50 }} />
            {subtitle(content.subtitle, { width: '100%', marginBottom: 25 })}
            {content.body}
        </HeaderlessRootContainer>
    )
}

function contentAndSubtitle({ ministryStatus, accountStatus, onMinistryNameSubmitted }) {
    if (ministryStatus == MinistryStatus.CREATING) {
        return { subtitle: 'Creating ministry...', body: loading() }
    }

    if (accountStatus == AccountStatus.ASSOCIATING) {
        return { subtitle: 'Setting up your account...', body: loading() }
    }

    return { subtitle: 'What is the name of your ministry?', body: ministryNameForm(onMinistryNameSubmitted) }
}

function loading() {
    return (
        <LoadingIndicator />
    )
}

function ministryNameForm(onMinistryNameSubmitted) {
    return (
        <Form style={{ width: '100%' }}>
            {ministryNameInput(onMinistryNameSubmitted)}
            {nextButton(onMinistryNameSubmitted)}
        </Form>
    )
}

function ministryNameInput(onMinistryNameSubmitted) {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 15 }}>
            <Label>Ministry name</Label>
            <Input
                maxLength={30}
                keyboardType={"default"}
                returnKeyType='done'
                returnKeyLabel='Create'
                onChangeText={ministryName => { inputState.ministryName = ministryName }}
                onSubmitEditing={(event) => { onMinistryNameSubmitted(event.nativeEvent.text) }}
            />
        </Item>
    )
}

function nextButton(onMinistryNameSubmitted) {
    return (
        <Button
            full
            primary
            onPress={() => { onMinistryNameSubmitted(inputState.ministryName) }}>
            <Text style={{ color: 'white' }}>
                Next
            </Text>
        </Button>
    )
}