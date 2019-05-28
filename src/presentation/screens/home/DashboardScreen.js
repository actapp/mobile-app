import React, { Component } from 'react'

import DashboardConnect from './DashboardConnect'
import renderContent from './DashboardRenderer'

class DashboardScreen extends Component {
    static KEY = 'DashboardScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return renderContent({
            account: this.props.account,
            ministry: this.props.ministry
        })
    }
}

export default DashboardConnect.connect(DashboardScreen)