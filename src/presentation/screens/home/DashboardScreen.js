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

    componentDidMount() {
        const { account } = this.props
        this.props.fetchStats(account.data.id, account.data.ministryId, account.data.role)
        this.props.fetchContacts(account.data.id)
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        return renderContent({
            ministry: this.props.ministry,
            stats: this.props.stats,
            contacts: this.props.contacts,
            component: this
        })
    }
}

export default DashboardConnect.connect(DashboardScreen)