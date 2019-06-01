/**
 * Given a "stat" that is one of the supported chart types, and given data
 * 
 * renders a chart
 */

import React from 'react'

import { PieChart } from 'react-native-chart-kit'
import { VictoryChart, VictoryLegend, VictoryPie } from 'victory-native'

const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    backgroundColor: 'white',
    color: () => 'white',
    strokeWidth: 2 // optional, default 3
}

export default function renderChart(data, width) {
    return renderPie(mapData(data), width)
}

function mapData(data) {
    return data.map(dataItem => ({
        name: dataItem.label,
        data: dataItem.data,
        color: dataItem.color,
        legendFontColor: '#fff',
        legendFontSize: 10
    }))
}

function renderPie(stat, width) {
    // return (
    //     <VictoryPie
    //         style={{
    //             data: {
    //                 stroke: (data) => data.y > 75 ? "black" : "none",
    //                 opacity: (data) => data.y > 75 ? 1 : 0.4
    //             },
    //             labels: {
    //                 fill: "white",
    //                 fontSize: 10,
    //                 fontFamily: 'sans-serif'
    //             }
    //         }}
    //         data={stat}
    //         width={300}
    //         height={150}
    //         labels={datum => datum.data}
    //         x='name'
    //         y='data'
    //     />
    // )

    return (
        <PieChart
            key={Math.random()}
            data={stat}
            width={width - 50}
            height={150}
            chartConfig={chartConfig}
            accessor="data"
            backgroundColor="transparent"
            absolute
        />
    )
}