import React, { Component } from 'react'

import DashboardConnect from './DashboardConnect'
import renderContent, { TABS } from './DashboardRenderer'

class DashboardScreen extends Component {
    static KEY = 'DashboardScreen'

    state = {
        activeTabIndex: TABS.STATS.index
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return renderContent({
            ministry: this.props.ministry,
            component: this
        })
    }
}

export default DashboardConnect.connect(DashboardScreen)