/**
 * Given a "stat" that is one of the supported chart types, and given data
 * 
 * renders a chart
 */

import React from 'react'

import { VictoryChart, VictoryBar, VictoryPie, VictoryTheme } from "victory-native";

import {
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'

import { BarChart, Grid } from 'react-native-svg-charts'

const CHART_TYPES = {
    COUNTS: 'COUNTS',
    PIE: 'PIE',
    STACKED: 'STACKED'
}

const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    backgroundColor: 'white',
    color: () => 'white',
    strokeWidth: 2 // optional, default 3
}

export default function renderChart(type, data, width) {
    switch (type) {
        case CHART_TYPES.COUNTS:
            return renderCounts(mapData(data), width)
        case CHART_TYPES.PIE:
            return renderPie(mapData(data), width)
        case CHART_TYPES.STACKED:
            return renderStacked(mapDataToStacked(data), width)
        default:
            throw new Error('Unsupported chart type: ' + type)
    }
}

function mapData(data) {
    return data.map(dataItem => ({
        name: dataItem.label,
        data: dataItem.data,
        color: dataItem.color,
        legendFontColor: '#fff',
        legendFontSize: 15
    }))
}

function mapDataToPie(data) {
    return data.map(dataItem => ({
        name: dataItem.label,
        data: dataItem.data,
        color: dataItem.color,
        legendFontColor: '#fff',
        legendFontSize: 15
    }))
}

function mapDataToStacked(data) {
    const labels = data.map(yearSection => yearSection.label)
    const legend = data
        .map(yearSection => yearSection.data)
        .map(yearSectionDataItem => yearSectionDataItem.label)

    const dataArray = data
        .map(yearSection =>
            yearSection.data
                .map(yearSectionDataItem => yearSectionDataItem.data))

    const barColors = data[0].data.map(yearSectionDataItem => yearSectionDataItem.color)

    return {
        labels,
        legend,
        data: dataArray,
        barColors
    }
}

function renderCounts(data, width) {
    const pieData = data.map(dataItem => {
        return { x: dataItem.label, y: dataItem.data, label: dataItem.label }
    })
    return (
        <PieChart
            data={data}
            width={width}
            height={220}
            chartConfig={chartConfig}
            accessor="data"
            backgroundColor="transparent"
            absolute
        />
    )
}

function renderPie(stat, width) {
    return (
        <PieChart
            key={Math.random()}
            data={stat}
            width={width}
            height={220}
            chartConfig={chartConfig}
            accessor="data"
            backgroundColor="transparent"
            absolute
        />
    )
}

function renderStacked(stat, width) {
    const adjustedWidth = width - 30 //idk

    return (
        <StackedBarChart
            data={stat}
            width={adjustedWidth}
            height={220}
            chartConfig={chartConfig}
            backgroundColor="#222"
        />
    )
} 