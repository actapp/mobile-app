import React from 'react'

import { ContactsStatus } from '../../../redux/Contacts'

import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { LoadingIndicator } from '../../../components/Foundation'
import Icon from 'react-native-vector-icons/Ionicons'

import { PlatformIcons } from '../../../style/Icons'
import Styles from '../../../style/Styles'

export default function renderShareContent({
    contacts,
    onContactClicked,
    onContactMessageClicked,
    onShareNowClicked
}) {
    const contactsStatus = contacts.status

    switch (contactsStatus) {
        case ContactsStatus.NOT_READY:
        case ContactsStatus.GETTING:
            return loading()
        case ContactsStatus.READY:
        case ContactsStatus.ADDED:
        case ContactsStatus.ADDING:
        case ContactsStatus.NONE:
        case ContactsStatus.UPDATED:
        case ContactsStatus.UPDATING:
            // TODO
            return renderContactsList({
                contacts: contacts.data,
                onContactClicked,
                onContactMessageClicked,
                onShareNowClicked
            })

            // TODO
            return renderContactsList({
                contacts: contacts.data,
                onContactClicked,
                onContactMessageClicked,
                onShareNowClicked
            })
        case ContactsStatus.ERROR:
        case ContactsStatus.ADD_ERROR:
            // TODO
            return loading()
    }
}

function loading() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LoadingIndicator />
        </View>
    )
}

function renderContactsList({
    contacts,
    onContactClicked,
    onContactMessageClicked,
    onShareNowClicked
}) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    style={{ height: '90%', width: '100%' }}
                    data={contacts}
                    renderItem={({ item }) => { return renderContact(item, onContactClicked, onContactMessageClicked) }}
                    keyExtractor={(item, index) => item.id + index}
                />
            </View>
            <View style={{ flex: 0.1 }} />
        </View>
    )
}

function renderContact(contact, onContactClicked, onContactMessageClicked) {
    return (
        <TouchableOpacity
            style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 15 }}
            onPress={() => { onContactClicked(contact) }}
        >
            <View style={styles.contactInfoContainer}>
                <Text style={{ ...styles.contactName }}>{contact.name}</Text>
                <Text style={styles.contactSubtitle}>Current topic: {contact.currentStepDesc}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={
                    () => { onContactMessageClicked(contact) }
                }>
                    <Icon name={PlatformIcons.name('chatbubbles')} style={styles.messageIcon} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    () => { onContactClicked(contact) }
                }>
                    <Icon name={PlatformIcons.name('arrow-forward')} style={styles.messageIcon} size={25} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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