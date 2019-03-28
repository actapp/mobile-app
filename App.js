/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { Colors } from './Styles';
import codePush from "react-native-code-push";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { renderStep } from './share/ShareStep';
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from './AnalyticsConstants';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

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
export async function googleLogin() {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential

    firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

    return true
  } catch (e) {
    console.error(e);
    throw e;
  }
}

type Props = {}

class App extends Component<Props> {
  state = {
    isAuthenticated: false
  }

  static navigationOptions = {
    header: null
  }

  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated: isAuthenticated })
  }

  componentDidMount() {
    GoogleSignin.isSignedIn()
    .then((isSignedIn) => {
      this.setState({isAuthenticated: isSignedIn})
    })
  }

  render() {
    let actionButton = null;

    if (this.state.isAuthenticated) {
      actionButton = (<Button
        label='Share'
        style={styles.mainButton}
        onPress={
          () => {
            this.props.navigation.navigate(steps[0].key)
            Analytics.trackEvent(AnalyticsConstants.EVENT_SHARE_STARTED)
          }
        }/>)
    } else {
      actionButton = (<Button
        label="Sign in"
        style={styles.mainButton}
        onPress={() => {
          googleLogin()
          .then((isAuthenticated) => {
            this.setIsAuthenticated(isAuthenticated)
          })
          .catch((error) => {
            this.setIsAuthenticated(false)
          })
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