/**
 * Given a "stat" that is one of the supported chart types, and given data
 * 
 * renders a chart
 */

import React from 'react'

import { VictoryChart, VictoryBar, VictoryPie, VictoryTheme } from "victory-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'

const CHART_TYPES = {
    COUNTS: 'COUNTS',
    PIE: 'PIE',
    STACKED: 'STACKED'
}

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
}

export default function renderChart(type, data, width) {
    switch (type) {
        case CHART_TYPES.COUNTS:
            return renderCounts(data, width)
        case CHART_TYPES.PIE:
            return renderPie(data, width)
        case CHART_TYPES.STACKED:
            return renderStacked(data, width)
        default:
            throw new Error('Unsupported chart type: ' + type)
    }
}

function renderCounts(data, width) {
    return (
        <PieChart
            key={Math.random()}
            data={[
                {
                    name: 'Saved',
                    count: 100,
                    color: 'green'
                },
                {
                    name: 'Unsaved',
                    count: 50,
                    color: 'yellow'
                },
                {
                    name: 'Undecided',
                    count: 30,
                    color: 'white'
                }
            ]}
            width={width}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            absolute
        />
    )
}

function renderPie(stat, width) {
    return (
        <PieChart
            key={Math.random()}
            data={[
                {
                    name: 'Saved',
                    count: 100,
                    color: 'green'
                },
                {
                    name: 'Unsaved',
                    count: 50,
                    color: 'yellow'
                },
                {
                    name: 'Undecided',
                    count: 30,
                    color: 'white'
                }
            ]}
            width={width}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            absolute
        />
    )
}

function renderStacked(stat, width) {
    return (
        <PieChart
            data={[
                {
                    name: 'Saved',
                    count: 100,
                    color: 'green'
                },
                {
                    name: 'Unsaved',
                    count: 50,
                    color: 'yellow'
                },
                {
                    name: 'Undecided',
                    count: 30,
                    color: 'white'
                }
            ]}
            width={width}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            absolute
        />
    )
} 