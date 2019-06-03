import React, { Component } from 'react'

import DashboardConnect from './DashboardConnect'

import { alert } from '../../alerts/Alerts'

import renderContent, { TABS } from './DashboardRenderer'

import LearnScreen from '../learn/LearnScreen'
import showAbout from '../utils/AboutPopup'

class DashboardScreen extends Component {
    static KEY = 'DashboardScreen'

    state = {
        activeTabIndex: TABS.STATS.index
    }

    render() {
        return renderContent({
            ministry: this.props.ministry,
            component: this,
            options: [
                {
                    name: 'Learn more',
                    action: () => {
                        this.props.navigation.navigate(LearnScreen.KEY)
                     }
                },
                {
                    name: 'About',
                    action: showAbout
                }
            ]
        })
    }
}

export default DashboardConnect.connect(DashboardScreen)