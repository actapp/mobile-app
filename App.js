/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, KeyboardAvoidingView, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { Colors } from './Styles';
import codePush from "react-native-code-push";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { renderStep } from './share/ShareStep';
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from './AnalyticsConstants';
// import firebase from 'react-native-firebase';
import ShareContact from './share/ShareContact';

export const steps = require('./share/content/steps.json')

type Props = {}

class App extends Component<Props> {
  state = {
    authInProgress: false,
    isAuthenticated: true,
    awaitingPhoneNumber: false,
    confirmResult: null,
    awaitingCode: false
  }

  static navigationOptions = {
    header: null
  }

  /*
  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated: isAuthenticated })
  }

  phoneAuth = (phoneNumber) => {
    actionButton =
      console.log("Authenticating via phone")

    this.setState({ authInProgress: true })
    // Erroneously assume US country code only for now...
    firebase.auth().signInWithPhoneNumber('+1' + phoneNumber)
      .then(confirmResult => {
        console.log('Confirm result: ' + confirmResult)

        this.setState({ authInProgress: false, confirmResult: confirmResult, awaitingCode: true, awaitingPhoneNumber: false })
      })
      .catch((error) => {
        console.log(error);
        this.setState({ authInProgress: false })
        alertError('An error occurred while authenticating your phone number')
      })
  }

  alertError = (message) => {

  }

  confirmPhoneAuth = (code) => {
    console.log('confirming: ' + code)

    this.setState({ authInProgress: true })
    this.state.confirmResult
      .confirm(code)
      .then(user => { // User is logged in
        console.log('authed')
        this.setState({ authInProgress: false, isAuthenticated: true, awaitingCode: false })
      })
      .catch(error => {
        console.log(error)
        // Error with verification code);
        this.setState({ authInProgress: false, isAuthenticated: false, awaitingCode: false })
        alertError('An error occurred while confirming your phone number. Please try again')
      })
  }

  requestPhoneNumber = () => {
    this.setState({ awaitingPhoneNumber: true })
  }

  signOut = () => {
    const setAuthenticated = () => { this.setState({ isAuthenticated: false }) }
    firebase.auth().signOut().then(function () {
      console.log('logged out')
      setAuthenticated()
    }).catch(function (error) {
      // An error happened.
      throw error;
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User is logged in: ' + (user !== null))
      this.setState({
        authInProgress: false,
        isAuthenticated: user !== null
      });
    });
  }
  */

  render() {
    let actionButton = null;

    if (this.state.authInProgress) {
      actionButton =
        <View>
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginBottom: 10 }} />
          <Text style={styles.loadingMessage}>Authenticating...</Text>
        </View>
    } else if (this.state.awaitingPhoneNumber) {
      actionButton =
        <KeyboardAvoidingView style={{ width: '80%' }}>
          <TextInput
            key='phoneNumber'
            placeholder='10-digit phone number'
            placeholderTextColor='white'
            maxLength={10}
            keyboardType={"numeric"}
            returnKeyType='done'
            returnKeyLabel='Sign in'
            onSubmitEditing={(event) => { this.phoneAuth(event.nativeEvent.text) }}
            style={{ borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
        </KeyboardAvoidingView>
    } else if (this.state.awaitingCode) {
      actionButton =
        <KeyboardAvoidingView style={{ width: '80%' }}>
          <TextInput
            key='confCode'
            placeholder='Enter your 6 digit code'
            placeholderTextColor='white'
            maxLength={10}
            keyboardType={"numeric"}
            returnKeyType='done'
            returnKeyLabel='Confirm'
            onSubmitEditing={(event) => { this.confirmPhoneAuth(event.nativeEvent.text) }}
            style={{ borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
        </KeyboardAvoidingView>
    } else if (this.state.isAuthenticated) {
      actionButton = (<Button
        label='Share'
        style={styles.mainButton}
        onPress={
          () => {
            //this.props.navigation.navigate(steps[0].key)
            this.props.navigation.navigate('ShareContact')
            Analytics.trackEvent(AnalyticsConstants.EVENT_SHARE_STARTED)
          }
        } />)
    } else {
      actionButton = (<Button
        label="Sign in"
        style={styles.mainButton}
        onPress={() => {
          this.requestPhoneNumber()
        }} />)
    }

    let signout = null
    if (this.state.isAuthenticated) {
      signout = (<View style={{ marginTop: 20 }}>
        <Button
          label="** Sign out"
          onPress={() => {
            this.signOut()
          }} />
      </View>)
    }

    return (
        //<ScrollView>
          <View style={{...styles.container}}>

            <Text text10 style={{ fontSize: 48, fontWeight: '100', color: '#ffffff' }}>MySharePal</Text>
            <Text text10 style={{ fontSize: 18, color: '#ffffff', marginBottom: 20 }}>A Simple Way to Share the Gospel</Text>

            {actionButton}
          </View>
        //</ScrollView>
    );
  }

  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.IMMEDIATE };
App = codePush(codePushOptions)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 120
  },
  loadingMessage: {
    color: 'white',
    fontSize: 16
  },
  mainButton: {
    backgroundColor: Colors.primary
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonBarButton: {
    backgroundColor: '#ffd54f',
    width: '45%',
    height: 40
  }
});

const stepScreens = {}
for (let i = 0; i < steps.length; i++) {
  stepScreens[steps[i].key] = renderStep(steps[i])
}

export const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  ShareContact: {
    screen: ShareContact
  },
  ...stepScreens
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
      },
      headerLeft: null
    }
  }
);

export default createAppContainer(AppNavigator);
