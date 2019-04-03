import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { steps } from '../App'

export default class ShareContact extends Component {
  render() {
     return (
       <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate(steps[0].key)}}>
            <Text>Go</Text>
        </TouchableOpacity>
       </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
