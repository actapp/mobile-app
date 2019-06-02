import React from 'react'

import { ContactsStatus } from '../../redux/Contacts'

import ThemedContainer from '../../components/ThemedContainer'

import { Header, Content, Form, Item, Input, Label, Text, Button, Icon, Left, Right, Body, Title } from 'native-base'
import { LoadingIndicator } from '../../components/Foundation'
import HeaderUpCaret from '../../components/HeaderUpCaret';

const inputState = {
    name: null,
    phone: null
}

const inputRefs = {
    name: null,
    phone: null
}

export default function renderContent({
    contactsStatus,
    onContactAdded,
    onBackPressed
}) {

    let content = null
    if (contactsStatus == ContactsStatus.ADDING) {
        content = addingContact()
    } else {
        content = addContactForm(onContactAdded)
    }

    return (
        <ThemedContainer>
            {header(onBackPressed)}
            <Content contentContainerStyle={{ flex: 1, flexGrow: 1, padding: 10 }}>
                {content}
            </Content>
        </ThemedContainer>
    )
}

function header(onBackPressed) {
    // Flex 5 allows for long title in header
    return (
        <Header>
            <Left>
                <HeaderUpCaret onPress={onBackPressed} />
            </Left>
            <Body style={{ flex: 5 }}>
                <Title>Who are you sharing with?</Title>
            </Body>
            <Right />
        </Header>
    )
}

function addingContact() {
    return <LoadingIndicator />
}

function addContactForm(onContactAdded) {
    return (
        <Form style={{ width: '100%' }}>
            {nameInput()}
            {phoneInput(onContactAdded)}
            {submitButton(onContactAdded)}
        </Form>
    )
}

function nameInput() {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 10 }}>
            <Label>Name</Label>
            <Input
                ref={ref => inputRefs.name = ref}
                maxLength={30}
                keyboardType={"default"}
                returnKeyType='done'
                returnKeyLabel='Next'
                onChangeText={contactName => { inputState.name = contactName }}
                onSubmitEditing={(event) => { inputRefs.phone.focus() }}
            />
        </Item>
    )
}

function phoneInput(onContactAdded) {
    return (
        <Item
            floatingLabel
            bordered

            // NativeBase has some weird padding thing that shows up on left
            style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 20 }}>
            <Label>Phone number</Label>
            <Input
                ref={ref => inputRefs.phone = ref}
                maxLength={10}
                keyboardType={'number-pad'}
                returnKeyType='done'
                returnKeyLabel='Done'
                onChangeText={contactPhone => { inputState.phone = contactPhone }}
                onSubmitEditing={(event) => { onContactAdded(inputState.name, inputState.phone) }}
            />
        </Item>
    )
}

function submitButton(onContactAdded) {
    return (
        <Button
            full
            transparent
            bordered
            light
            iconRight
            onPress={() => onContactAdded(inputState.name, inputState.phone)}
        >
            <Text style={{ color: 'white' }}>Start</Text>
            <Icon name='arrow-forward' color='white' />
        </Button>
    )
}