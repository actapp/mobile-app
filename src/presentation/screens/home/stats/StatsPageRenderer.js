import React from 'react'
import { View, Dimensions } from 'react-native'
import { LoadingIndicator } from '../../../components/Foundation'

import {
    Body,
    Text,
    Card,
    CardItem
} from 'native-base'

import { StatsStatus } from '../../../redux/Stats'

import renderChart from './ChartRenderer';

// TODO - find a better way to handle this
const chartWidth = Dimensions.get('window').width - 20

export default function renderStatsContent(stats) {
    const statsStatus = stats.status
    const statsData = stats.data

    switch (statsStatus) {
        case StatsStatus.NOT_READY:
            // Do nothing
            return loading()
        case StatsStatus.GETTING:
            return loading()
        case StatsStatus.READY:
            return renderCharts(statsData)
        case StatsStatus.NONE:
            // TODO
            return loading()
        case StatsStatus.ERROR:
            // TODO
            return loading()
    }
}

function loading() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LoadingIndicator />
        </View>
    )
}

function renderCharts(statsArray) {
    let chartCards =
        statsArray
            .map(stat => {
                return {
                    label: stat.label,
                    chart: renderChart(stat.data, chartWidth)
                }
            })
            .map(({ label, chart }) => renderChartCard(label, chart))

    return chartCards
}

function renderChartCard(label, chart) {
    return (
        <Card style={{ flex: 1 }} key={Math.random()}>
            <CardItem header bordered>
                <Text style={{ color: 'white' }}>{label}</Text>
            </CardItem>
            <CardItem>
                <Body>
                    {chart}
                </Body>
            </CardItem>
        </Card>
    )
}