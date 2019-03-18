/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View, TextInput, Text, Button } from 'react-native-ui-lib';
import codePush from "react-native-code-push";
import { Typography, Colors } from 'react-native-ui-lib';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ShareStep1, ShareStep2 } from './share/ShareStep';

type Props = {}

class App extends Component<Props> {
  state = {
  }

  render() {
    return (
      <View flex paddingH-25 paddingT-120 style={styles.container}>
        <Text white center text10 style={{ fontSize: 48 }}>ACT</Text>
        <Text white center text10 marginB-20 style={{ fontSize: 18 }}>Share Jesus without fear</Text>

        <Button
          onPress={
            () => {
              this.props.navigation.navigate('ShareStep1')
            }
          }
          style={styles.buttonBarButton}>
          <Text>Share</Text>
        </Button>
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

Colors.loadColors({
  black: '#000000',
  gold: '#FFD700',
});

Typography.loadTypographies({
  h1: { fontSize: 50, fontWeight: '100', lineHeight: 80 },
  h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
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

export const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  ShareStep1: {
    screen: ShareStep1
  },
  ShareStep2: {
    screen: ShareStep2
  }
});

export default createAppContainer(AppNavigator);