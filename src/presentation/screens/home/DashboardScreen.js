import React, { Component } from 'react'

import DashboardConnect from './DashboardConnect'
import renderContent from './DashboardRenderer'

class DashboardScreen extends Component {
    static KEY = 'DashboardScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        const { account } = this.props
        this.props.fetchStats(account.id, account.ministryId, account.role)
    }

    render() {
        return renderContent({
            account: this.props.account,
            ministry: this.props.ministry,
            stats: this.props.stats
        })
    }
}

export default DashboardConnect.connect(DashboardScreen)