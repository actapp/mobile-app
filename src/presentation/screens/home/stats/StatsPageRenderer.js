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

export default function renderStatsContent(stats, ministryName) {
    const statsStatus = stats.status
    const statsData = stats.data

    switch (statsStatus) {
        case StatsStatus.NOT_READY:
            // Do nothing
            return loading()
        case StatsStatus.GETTING:
            return loading()
        case StatsStatus.READY:
            return renderCharts(statsData, ministryName)
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

function renderCharts(statsData, ministryName) {
    const statsDataForCharts = [
        createChartDataObject('MySharePal Community', statsData.global)
    ]

    if (statsData.ministry) {
        statsDataForCharts.push(createChartDataObject(ministryName, statsData.ministry))
    }

    statsDataForCharts.push(createChartDataObject('Me', statsData.user))

    const chartCards = statsDataForCharts
        .map(statDataForChart => {
            return renderChartCard(
                statDataForChart.label,
                renderChart(statDataForChart.data, chartWidth)
            )
        })

    return (
        <View style={{ padding: 10 }}>
            {chartCards}
        </View>
    )
}

function createChartDataObject(label, statData) {
    return {
        label,
        data: createChartData(statData)
    }
}

function createChartData(statData) {
    const baseStyling = {
        legendFontColor: 'white',
        legendFontSize: 10
    }

    return [
        {
            name: 'Spiritual convos',
            data: statData.convos <= 0 ? 1 : statData.convos,
            color: '#7a7cff',
            ...baseStyling
        },
        {
            name: 'Accepted Christ',
            data: statData.conversions <= 0 ? 0 : statData.conversions,
            color: '#0026ca',
            ...baseStyling
        }
    ]
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