import React, { Component } from 'react'

import { connect } from 'react-redux'
import LogInConnect from './LogInConnect'

import renderContent from './LogInRenderer'

class LogInScreen extends Component {
    static KEY = 'LogInScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return renderContent({
            onPhoneNumberSubmitted: this.onPhoneNumberSubmitted
        })
    }

    onPhoneNumberSubmitted = (phoneNumber) => {
        console.log('Phone number submitted: ' + phoneNumber)
    }
}

export default connect(LogInConnect.mapStateToProps, LogInConnect.mapDispatchToProps)(LogInScreen)