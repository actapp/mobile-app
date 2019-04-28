/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

import handleError, { CONTACTS_ERROR } from './utils/GlobalErrorHandler'
import { alertError } from './components/Foundation'
import { CommonStyles, Colors } from './Styles'

import codePush from "react-native-code-push";

// Data
import { listenForAuthenticationChange } from './data/AuthInteractor'
import { hasContacts } from './data/ContactInteractor';

// Main screen components
import Welcome from './screens/Welcome'
import Intro from './screens/Intro'
import Home from './screens/Home'

// Other components needed for React Navigation declaration
import ShareContact from './share/ShareContact';
import { stepScreens } from './screens/StepScreens'

import Navigation from './navigation/Navigation';

class App extends Component {
  static SCREEN_ID = "Main"

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.screenTitle : '',
    }
  };

  state = {
    initializing: true,
    isAuthenticated: false,
    hasContacts: false
  }

  static currentUser = null
  static unsubscribeAuthListener = null

  componentDidMount() {
    // Check authentication

    this.unsubscribeAuthListener = listenForAuthenticationChange(user => {
      this.currentUser = user

      if (user == null) {
        Navigation.navigate('Welcome')
        return
      }

      hasContacts(user.uid)
        .then(hasContacts => {
          console.log("has contacts: " + hasContacts)
          if (hasContacts) {
            this.startScreen('Home')
          } else {
            this.startScreen('Welcome')
          }
        })
        .catch(error => {
          handleError(CONTACTS_ERROR, error, { step: 'HAS_CONTACTS' })
          alertError()
          this.startScreen('Welcome')
        })
    }, this.currentUser)
  }

  componentWillUnmount() {
    this.unsubscribeAuthListener()
  }

  startScreen = (title) => {

  }

  initialLoading = () => {
    return (
      <View style={{ ...CommonStyles.container, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  render() {
    return <Navigation initialScreenId={App.SCREEN_ID} renderScreen={this.renderScreen} />
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };
App = codePush(codePushOptions)(App)

export default App
// export const AppNavigator = createStackNavigator({
//   Main: {
//     screen: App
//   },
//   Welcome: {
//     screen: Welcome
//   },
//   Intro: {
//     screen: Intro
//   },
//   Home: {
//     screen: Home
//   },
//   ShareContact: {
//     screen: ShareContact
//   },
//   ...stepScreens
// },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#000',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: '100',
//       },
//       headerLeft: null
//     }
//   }
// );

// export default createAppContainer(AppNavigator);
