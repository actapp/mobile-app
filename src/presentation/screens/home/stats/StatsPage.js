import React, { Component } from 'react'

import StatsPageConnect from './StatsPageConnect'

import { withNavigation } from 'react-navigation';

import renderStatsContent from './StatsPageRenderer';

class StatsPage extends Component {
    componentDidMount = () => {
        // Fetch stats
        this.props.fetch(this.props.accountData)
    }

    render = () => renderStatsContent(this.props.stats)
}

// Wrap the component in 'withNavigation' so that navigation can be used, then redux-connect it
export default StatsPageConnect.connect(withNavigation(StatsPage))