import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ContactsActions } from '../../redux/Contacts'
import { ShareActions } from '../../redux/Share'

import { renderAddingContact, renderAddContact } from './StartShareComponents'
import { renderUpButton } from '../utils/HeaderComponents'

import { alertError } from '../../alerts/Alerts'
import handleError, { ADD_CONTACT_ERROR } from '../../../utils/GlobalErrorHandler'

import ShareScreen from './ShareScreen'

import { trackShareStarted } from '../../../core/analytics/AnalyticsInteractor'

class StartShareScreen extends Component {
  static KEY = 'StartShareScreen'

  static navigationOptions = ({ navigation }) => {
    const goBack = () => navigation.goBack()

    return {
      title: 'Who are you sharing with?',
      headerLeft: renderUpButton(goBack)
    }
  }

  state = {
    name: null,
    phone: null,
    isLoading: false
  }

  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return renderAddingContact(this)
    } else {
      return renderAddContact(this)
    }
  }

  focusToRef(ref) {
    this.refs[ref].focus()
  }

  onFormSubmitted = () => {
    const { name, phone } = this.state
    const { uid } = this.props

    // Add contact
    // Show loading
    // When added, start session

    this.setState({ isLoading: true })

    const navToShare = this.props.navigation.replace

    console.log('Adding ' + phone)

    this.props.addContact(name, phone, uid)
      .then(contact => {
        this.props.checkStepsAndStartSession(contact.id, contact.currentStepIndex)
        navToShare(ShareScreen.KEY)
        trackShareStarted(this.props.uid, contact.id)
      })
      .catch(error => {
        this.setState({ isLoading: false })
        alertError(error.message, 'Error')
        handleError(ADD_CONTACT_ERROR, error)
      })
  }
}

const mapStateToProps = state => ({
  uid: state.logIn.uid
})

const mapDispatchToProps = dispatch => ({
  addContact: (name, phone, uid) => dispatch(ContactsActions.addContact(name, phone, uid)),
  checkStepsAndStartSession: (contactId, startIndex) => dispatch(ShareActions.checkStepsAndStartSession(contactId, startIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartShareScreen)