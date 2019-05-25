import React, { Component } from 'react'

import ATMConnect from './ATMConnect'

import renderContent from './ATMRenderer'

class AssociateToMinistryScreen extends Component {
    static KEY = 'ATMScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return renderContent({})
    }
}

export default ATMConnect.connect(AssociateToMinistryScreen)