/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, KeyboardAvoidingView, TextInput } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { Colors } from './Styles';
import codePush from "react-native-code-push";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { renderStep } from './share/ShareStep';
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from './AnalyticsConstants';
import firebase from 'react-native-firebase';
// import CodeInput from 'react-native-confirmation-code-field';// import console = require('console');
// import VerificationCode from './components/VerificationCode';
//import { GoogleSignin } from 'react-native-google-signin';

const steps = require('./share/content/steps.json')
// const db = firebase.firestore();

// let steps = null;
// firebase
//   .firestore()
//   .runTransaction(async transaction => {
//     const doc = await transaction.get(ref);

//     console.log(doc);

//     return doc;
//     // if it does not exist set the population to one
//     // if (!doc.exists) {
//     //   transaction.set(ref, { population: 1 });
//     //   // return the new value so we know what the new population is
//     //   return 1;
//     // }

//     // exists already so lets increment it + 1
//     // const newPopulation = doc.data().population + 1;

//     // transaction.update(ref, {
//     //   population: newPopulation,
//     // });

//     // return the new value so we know what the new population is
//     // return newPopulation;
//   })
//   .then(steps => {
//     console.log(
//       `Transaction successfully committed and steps is '${steps}'`
//     );
//   })
//   .catch(error => {
//     console.log('Transaction failed: ', error);
//   });

// Calling this function will open Google for login.
//export async function googleLogin() {
// try {
// add any configuration settings here:
// await GoogleSignin.configure();

//const data = await GoogleSignin.signIn();

// create a new firebase credential with the token
//const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
// login with credential

//firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

//console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

//return true
//} catch (e) {
//console.error(e);
//throw e;
//}
//}

type Props = {}

class App extends Component<Props> {
  state = {
    isAuthenticated: false,
    awaitingPhoneNumber: false,
    confirmResult: null,
    awaitingCode: false
  }

  static navigationOptions = {
    header: null
  }

  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated: isAuthenticated })
  }

  phoneAuth = (phoneNumber) => {
      actionButton = 
    console.log("Authenticating via phone")

    // Erroneously assume US country code only for now...
    firebase.auth().signInWithPhoneNumber('+1' + phoneNumber)
      .then(confirmResult => {
        console.log('Confirm result: ' + confirmResult)

        this.setState({ confirmResult: confirmResult, awaitingCode: true, awaitingPhoneNumber: false })
      })
      .catch(error => console.log(error));
  }

  confirmPhoneAuth = (code) => {
    console.log('confirming: ' + code)

    this.state.confirmResult
      .confirm(code)
      .then(user => { // User is logged in
        console.log('authed')
        this.setState({ isAuthenticated: true, awaitingCode: false })
      })
      .catch(error => {
        cosole.log(error)
        // Error with verification code);
        this.setState({ isAuthenticated: false, awaitingCode: false })
      })
  }

  requestPhoneNumber = () => {
    this.setState({awaitingPhoneNumber: true})
  }
  //componentDidMount() {
  //GoogleSignin.isSignedIn()
  //.then((isSignedIn) => {
  // this.setState({isAuthenticated: isSignedIn})
  //})
  //}

  render() {
    let actionButton = null;

    if(this.state.awaitingPhoneNumber) {
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
            style={{borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
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
            style={{borderColor: 'white', borderWidth: 1, color: 'white', padding: 15, fontSize: 16 }} />
        </KeyboardAvoidingView>
    } else if (this.state.isAuthenticated) {
      actionButton = (<Button
        label='Share'
        style={styles.mainButton}
        onPress={
          () => {
            this.props.navigation.navigate(steps[0].key)
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

    return (
      <View flex paddingH-25 paddingT-120 style={styles.container}>
        <Text text10 style={{ fontSize: 48, fontWeight: '100', color: '#ffffff' }}>ACT</Text>
        <Text text10 style={{ fontSize: 18, color: '#ffffff', marginBottom: 20 }}>Share Jesus without fear</Text>

        {actionButton}
      </View>
    );
  }

  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
App = codePush(codePushOptions)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
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
