/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>Welcome</Text>
      <TextInput text50 placeholder="username" dark10/>
      <TextInput text50 placeholder="password" secureTextEntry dark10/>
      <View marginT-100 center>
        <Button text70 white background-orange30 label="Login"/>
        <Button link text70 orange30 label="Sign Up" marginT-20/>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
