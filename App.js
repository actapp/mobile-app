import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

import { connect } from 'react-redux'
import { logIn } from './redux/Reducer'

class App extends Component {
  render() {
    const { isAuthenticated, isAuthenticating } = this.props

    let text = "Logged in: " + isAuthenticated
    if(isAuthenticating) {
      text = "Logging in: " + isAuthenticating
    }

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{text}</Text>
        <Button title="Log in" onPress={this.props.logIn}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.isAuthenticating,
    isAuthenticated: state.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(logIn('+19132379703'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);