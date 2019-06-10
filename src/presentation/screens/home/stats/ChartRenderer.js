/**
 * Given a "stat" that is one of the supported chart types, and given data
 * 
 * renders a chart
 */

import React from 'react'

import { View, Text } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    backgroundColor: 'white',
    color: () => 'white',
    strokeWidth: 2 // optional, default 3
}

export default function renderChart(data, width) {
    return renderCounters(data)
}

function renderCounters(data) {
    const counters = data.map(dataItem => renderCounter(dataItem))

    return (
        <View style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            {counters}
        </View>
    )
}

function renderCounter(dataItem) {
    return (
        <View
            key={dataItem.name + dataItem.data}
            style={{
                flex: 1,
                alignItems: 'center'
            }}>
            <Text style={{
                color: dataItem.color,
                fontSize: 34,
                marginBottom: 15
            }}>
                {dataItem.data}
            </Text>
            <Text style={{
                color: 'white',
                fontSize: 14
            }}>
                {dataItem.name}
            </Text>
        </View>
    )
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