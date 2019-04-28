import React, { Component } from 'react'

import { connect } from 'react-redux'

import { ShareActions } from '../../redux/Share'

import StartShareScreen from '../share/StartShareScreen'
import ShareScreen from '../share/ShareScreen'

import { renderBody, renderOptionsIcon } from './HomeComponents'

import { sendMessage } from '../../../core/MessagingInteractor'
import { showAbout } from '../utils/AboutPopup'
import LearnScreen from '../learn/LearnScreen';

class HomeScreen extends Component {
    static KEY = 'HomeScreen'

    static navigationOptions = ({ navigation }) => {
        const showVideos = () => {
            navigation.navigate(LearnScreen.KEY)
        }

        return {
            title: 'Dashboard',
            headerRight: renderOptionsIcon(
                ['Learn more', 'About'],
                [showVideos, showAbout]
            )
        };
    };

    render() {
        return renderBody(this.props.contacts, this)
    }

    onShareNowClicked = () => {
        this.props.navigation.navigate(StartShareScreen.KEY)
    }

    onContactClicked = (contact) => {
        this.onContactResumeClicked(contact)
    }

    onContactMessageClicked = (contact) => {
        sendMessage(contact.phone)
    }

    onContactResumeClicked = (contact) => {
        this.props.checkStepsAndStartSession(contact.id, contact.currentStepIndex)
        this.props.navigation.navigate(ShareScreen.KEY)
    }


}

const mapStateToProps = state => ({
    contacts: state.contacts.contacts
})

const mapDispatchToProps = dispatch => ({
    checkStepsAndStartSession: (contactId, startIndex) => dispatch(ShareActions.checkStepsAndStartSession(contactId, startIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)