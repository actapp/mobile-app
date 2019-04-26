import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import OptionsMenu from "react-native-options-menu";
import Icon from 'react-native-vector-icons/Ionicons';
import { PlatformIcons, Colors, CommonStyles } from '../Styles';

import { text } from '../lib/AKCommunications'
import { getContacts } from '../data/ContactInteractor'
import { alertError } from '../components/Foundation';
import handleError, {
    CONTACTS_ERROR
} from '../utils/GlobalErrorHandler'

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        const showVideos = () => {
            navigation.navigate('Intro')
        }

        return {
            title: 'Dashboard',
            headerRight: <OptionsMenu
                customButton={<Icon name={PlatformIcons.name('more')} size={25} color='white' style={{ marginRight: 20 }} />}
                options={['Learn more']}
                actions={[showVideos]} />
        };
    };

    state = {
        initializing: true,
        shareContacts: []
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.initContacts()
    }

    initContacts = () => {
        getContacts()
            .then((contacts) => {
                this.setState({ initializing: false, shareContacts: contacts })
            })
            .catch((error) => {
                handleError(CONTACTS_ERROR, error, { step: 'GET_CONTACTS' })
                alertError()
                this.setState({ initializing: false })
            })
    }

    startNewSession = () => {
        this.props.navigation.navigate('ShareContact')
    }

    resumeSession = (contact) => {
        console.log(contact)
        this.props.navigation.navigate(contact.currentStep, {
            contact: contact
        })
    }

    componentWillUnmount() {
        console.log('will unmount!')
    }

    showVideos = () => {
        this.props.navigation.navigate('Intro')
    }

    render() {
        const renderContact = this.renderContact

        return (
            <View style={{ ...styles.container }}>
                <FlatList
                    style={{ height: '90%', width: '100%' }}
                    data={this.state.shareContacts}
                    renderItem={({ item }) => { return renderContact(item) }}
                />
                <TouchableOpacity style={styles.actionButton} onPress={this.startNewSession}>
                    <Text style={styles.actionButtonText}>Share now</Text>
                    <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' />
                </TouchableOpacity>
            </View>
        )
    }
    /**
     * <TouchableOpacity style={styles.actionButton} onPress={this.startNewSession}>
                    <Text style={styles.actionButtonText}>Share now</Text>
                    <Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' />
                </TouchableOpacity>
     */

    renderContact = (contact) => {
        const resume = this.resumeSession
        return (
            <TouchableOpacity
                style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 15 }}
                onPress={() => { resume(contact) }}
            >
                <View style={styles.contactInfoContainer}>
                    <Text style={{ ...styles.contactName }}>{contact.name}</Text>
                    <Text style={styles.contactSubtitle}>Current topic: {contact.currentStepDesc}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={
                        () => { text(contact.phone) }
                    }>
                        <Icon name={PlatformIcons.name('chatbubbles')} style={styles.messageIcon} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => { resume(contact) }
                    }>
                        <Icon name={PlatformIcons.name('arrow-forward')} style={styles.messageIcon} size={25} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    ...CommonStyles,
    container: {
        ...CommonStyles.container,
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