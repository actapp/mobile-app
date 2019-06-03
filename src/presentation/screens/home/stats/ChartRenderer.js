/**
 * Given a "stat" that is one of the supported chart types, and given data
 * 
 * renders a chart
 */

import React from 'react'

import { PieChart } from 'react-native-chart-kit'

const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    backgroundColor: 'white',
    color: () => 'white',
    strokeWidth: 2 // optional, default 3
}

export default function renderChart(data, width) {
    return renderPie(data, width)
}

function renderPie(data, width) {
    return (
        <PieChart
            key={Math.random()}
            data={data}
            width={width - 50}
            height={150}
            chartConfig={chartConfig}
            accessor="data"
            backgroundColor="transparent"
            absolute
        />
    )
}