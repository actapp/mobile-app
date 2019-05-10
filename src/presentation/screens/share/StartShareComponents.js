import React from 'react'

import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LoadingIndicator, WizardButton } from '../../components/Foundation'
import { PlatformIcons } from '../../style/Icons'

import Colors from '../../style/Colors'
import Styles from '../../style/Styles'

const NAME_REF = 'name'
const NUMBER_REF = 'number'

export function renderAddingContact(screenComp) {
    return wrapIntoRootView(
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingIndicator />
        </View>
    )
}

export function renderAddContact(screenComp) {
    return wrapIntoRootView(
        <View style={{ width: '100%' }}>
            {textField('Name', 'default', 'next', 10, NAME_REF, (text) => { screenComp.setState({ name: text }) }, (event) => { screenComp.focusToRef(NUMBER_REF) })}
            {textField('Phone number', 'numeric', 'go', 30, NUMBER_REF, (text) => { screenComp.setState({ phone: text }) }, (event) => { screenComp.onFormSubmitted() })}

            <WizardButton onPress={screenComp.onFormSubmitted} label='Start' style={{ width: '100%' }} iconOnRight={true} iconName={PlatformIcons.name('arrow-forward')} />
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