/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions, StackActions } from "react-navigation";

import { alertError } from './components/Foundation'
import { Colors } from './Styles'

import codePush from "react-native-code-push";
import firebase from 'react-native-firebase';

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

type Props = {}

class App extends Component<Props> {
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
  static authListener = null

  componentDidMount() {
    // Check authentication

    this.authListener = listenForAuthenticationChange(user => {
      // console.log("User updated: " + user.uid)
      this.currentUser = user
      // this.setState({ isAuthenticated: user !== null })

      if (user == null) {
        // this.setState({ initializing: false })
        this.props.navigation.replace('Welcome')
        return
      }

      hasContacts(user.uid)
        .then(hasContacts => {
          console.log("has contacts: " + hasContacts)
          // this.setState({ hasContacts: hasContacts, initializing: false })
          // this.props.navigation.replace('Home')
          if (hasContacts) {
            this.startScreen('Home')
          } else {
            this.startScreen('Welcome')
          }
        })
        .catch(error => {
          console.log(error)
          alertError()
          // this.setState({ hasContacts: false, initializing: false })
          // this.propsnavigation.replace('Welcome')
          this.startScreen('Welcome')
        })
    }, this.currentUser)
  }

  componentWillUnmount() {
    this.authListener()
  }

  startScreen = (title) => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: title })],
    // });

    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.replace(title)
  }

  render() {
    // if (this.state.initializing) {
    return <ActivityIndicator size="large" color={Colors.primary} />
    // }

    // if (this.state.isAuthenticated && this.state.hasContacts) {
    //   return <Home />
    // } else {
    //   return <Welcome isAuthenticated={this.state.isAuthenticated} />
    // }
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };
App = codePush(codePushOptions)(App)

export const AppNavigator = createStackNavigator({
  Main: {
    screen: App
  },
  Welcome: {
    screen: Welcome
  },
  Intro: {
    screen: Intro
  },
  Home: {
    screen: Home
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
