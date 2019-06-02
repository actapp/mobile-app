import React from 'react'

import { ContactsStatus } from "../../redux/Contacts";

import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'

import { LoadingIndicator, WizardButton } from '../../components/Foundation'
import { PlatformIcons } from '../../style/Icons'

import Colors from '../../style/Colors'
import Styles from '../../style/Styles'

const NAME_REF = 'name'
const NUMBER_REF = 'number'

const formState = {
    name: null,
    phone: null
}

export default function renderContent(
    focusToRef,
    contactsStatus,
    onContactAdded
) {
    if (contactsStatus == ContactsStatus.ADDING) {
        return renderAddingContact()
    }

    return renderAddContact(focusToRef, onContactAdded)
}

function renderAddingContact() {
    return wrapIntoRootView(
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingIndicator />
        </View>
    )
}

function renderAddContact(focusToRef, onContactAdded) {
    return wrapIntoRootView(
        <View style={{ width: '100%' }}>
            {textField('Name', 'default', 'next', 10, NAME_REF, (text) => { formState.name = text }, (event) => { focusToRef(NUMBER_REF) })}
            {textField('Phone number', 'numeric', 'go', 30, NUMBER_REF, (text) => { formState.phone = text }, (event) => { onContactAdded(formState.name, formState.phone) })}

            <WizardButton onPress={() => { onContactAdded(formState.name, formState.phone) }} label='Start' style={{ width: '100%' }} iconOnRight={true} iconName={PlatformIcons.name('arrow-forward')} />
        </View>
    )
}

function textField(label, keyboardType, returnKeyType, marginBottom, ref, onChangeText, onSubmitEditing, maxLength) {
    return (
        <View>
            <Text style={styles.labelText}>{label}</Text>
            <TextInput
                ref={ref}
                returnKeyType={returnKeyType == null ? 'done' : returnKeyType}
                keyboardType={keyboardType == null ? 'default' : keyboardType}
                style={{ ...Styles.textInput, width: '100%', marginBottom: marginBottom }}
                placeholderTextColor={Colors.placeholderText} placeholder={label}
                onSubmitEditing={onSubmitEditing}
                onChangeText={onChangeText}
                maxLength={maxLength} />
        </View>
    )
}

function wrapIntoRootView(content) {
    return (
        <ScrollView style={{ backgroundColor: Colors.rootBackgroundColor }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                {content}
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        ...Styles.rootContainer,
        paddingLeft: 25,
        paddingRight: 20,
        paddingTop: 20
    },
    labelText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2
    }
})