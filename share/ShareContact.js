import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { CommonStyles, Colors, PlatformIcons } from '../Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { WizardButton, LoadingIndicator, alertError } from '../components/Foundation';
import store from 'react-native-simple-store';
import uuidv4 from '../utils/UUID';
import { steps } from '../screens/StepScreens'
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from '../AnalyticsConstants';

export default class ShareContact extends Component {
  static navigationOptions = {
    title: 'Who are you sharing with?'
    // headerRight: (
    //     <TouchableOpacity
    //         onPress={() => {
    //             alert('Tip', content.comments)
    //         }}>f
    //         <Icon name={PlatformIcons.name('help-circle')} size={25} color='white' style={{ marginRight: 15 }} />
    //     </TouchableOpacity>
    // ),
  }

  state = {
    contactAuthStatus: null,
    authChecked: false,
    isSubmitting: false,

    name: null,
    phone: null
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  textField = (label, keyboardType, returnKeyType, marginBottom, ref, onChangeText, onSubmitEditing, maxLength) => {
    return (
      <View>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          ref={ref}
          returnKeyType={returnKeyType == null ? 'done' : returnKeyType}
          keyboardType={keyboardType == null ? 'default' : keyboardType}
          style={{ ...CommonStyles.textInput, width: '100%', marginBottom: marginBottom }}
          placeholderTextColor={Colors.grayedOut} placeholder={label}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          maxLength={maxLength} />
      </View>
    )
  }

  collectData = () => {
    return {
      name: this.state.name,
      phone: this.state.phone
    }
  }

  submitForm = () => {
    const contact = this.collectData()

    contact['id'] = uuidv4()
    contact['currentStep'] = steps[0].key
    contact['currentStepDesc'] = steps[0].desc

    console.log(contact)

    store.get('contacts')
      .then((contacts) => {
        console.log('Got: ' + JSON.stringify(contacts))

        let newContacts = {}
        if (contacts != null) {
          newContacts = contacts
        }

        newContacts[contact.id] = contact

        store
          .save('contacts', newContacts)
          .then(() => {
            Analytics.trackEvent(AnalyticsConstants.CONTACT_ADDED, {
              contactId: contact.id,
              contactPhone: contact.phone,
              contactName: contact.name
            })

            console.log(this.props.navigation)
            this.props.navigation.navigate(steps[0].key, {
              contact: contact
            })

            console.log('saved')
          })
      })

    // const ref = firebase.firestore().collection('users').doc('contacts');
    // const data = this.collectData()

    // firebase
    //   .firestore()
    //   .runTransaction(async transaction => {
    //     const doc = await transaction.get(ref);

    //     console.log(doc);

    //     if(!doc.exists) {
    //       transaction.set(doc, data)
    //     } else {
    //       transaction.update(doc, data)
    //     }

    //     return doc
    //   })
    //   .then(submittedData => {
    //     console.log('Submitted data: ' + submittedData)

    //   })
    //   .catch(error => {
    //     console.log('Transaction failed: ', error);
    //     alertError('An error occurred. Please try again later.')
    //   });
  }

  render() {
    let actionButton = null
    if (this.state.isSubmitting) {
      actionButton = <LoadingIndicator />
    } else {
      actionButton = <WizardButton onPress={this.submitForm} label='Start' style={{ width: '100%' }} onPress={this.submitForm} iconOnRight={true} iconComponent={<Icon name={PlatformIcons.name('arrow-forward')} size={20} color='white' style={{ marginLeft: 10 }} />} />
    }

    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        <KeyboardAvoidingView style={{ ...CommonStyles.container, paddingLeft: 25, paddingRight: 20, paddingTop: 25 }}>
          <View style={{ width: '100%' }}>
            {this.textField('Name', 'default', 'next', 10, (input) => { this.nameInput = input }, (text) => { this.setState({ name: text }) }, (event) => { this.phoneInput.focus() })}
            {this.textField('Phone number', 'numeric', 'go', 30, (input) => { this.phoneInput = input }, (text) => { this.setState({ phone: text }) }, this.submitForm, 10)}

            {actionButton}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2
  }
})
