import React, { Component } from 'react'

import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Styles from '../../style/Styles'
import { PlatformIcons } from '../../style/Icons'

import OptionsMenu from "react-native-options-menu";

export function renderBody(contacts, screenComp) {
    return (
        <View style={{ ...styles.container }}>
            <FlatList
                style={{ height: '90%', width: '100%' }}
                data={contacts}
                renderItem={({ item }) => { return renderContact(item, screenComp) }}
            />
            <TouchableOpacity style={styles.actionButton} onPress={screenComp.onShareNowClicked}>
                <Text style={styles.actionButtonText}>Share now</Text>
                <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' />
            </TouchableOpacity>
        </View>
    )
}

function renderContact(contact, screenComp) {
    return (
        <TouchableOpacity
            style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 15 }}
            onPress={() => { screenComp.onContactClicked(contact) }}
        >
            <View style={styles.contactInfoContainer}>
                <Text style={{ ...styles.contactName }}>{contact.name}</Text>
                <Text style={styles.contactSubtitle}>Current topic: {contact.currentStepDesc}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={
                    () => { screenComp.onContactMessageClicked(contact) }
                }>
                    <Icon name={PlatformIcons.name('chatbubbles')} style={styles.messageIcon} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    () => { screenComp.onContactResumeClicked(contact) }
                }>
                    <Icon name={PlatformIcons.name('arrow-forward')} style={styles.messageIcon} size={25} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export function renderOptionsIcon(options, optionActions) {
    return (
        <OptionsMenu
            customButton={<Icon name={PlatformIcons.name('more')} size={25} color='white' style={{ marginRight: 20 }} />}
            options={options}
            actions={optionActions} />
    )
}

const styles = StyleSheet.create({
    container: {
        ...Styles.rootContainer,
        paddingLeft: 0,
        paddingRight: 0
    },
    contactInfoContainer: {
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    contactName: {
        color: 'white',
        fontSize: 20
    },
    contactSubtitle: {
        color: '#c5c5c5',
        fontSize: 16
    },
    messageIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white'
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        width: '100%',
        height: '10%'
    },
    actionButtonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginRight: 15,
        marginBottom: 3
    }
})