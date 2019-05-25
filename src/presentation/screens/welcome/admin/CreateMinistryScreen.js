import React, { Component } from 'react'

import CMConnect from './CMConnect'

import renderContent from './CMRenderer';

class CreateMinistryScreen extends Component {
    static KEY = 'CMScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return renderContent()
    }
}

export default CMConnect.connect(CreateMinistryScreen)