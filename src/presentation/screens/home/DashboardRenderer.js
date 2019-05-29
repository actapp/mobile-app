import React from 'react'

import { StatsStatus } from '../../redux/Stats'

import { View, Dimensions, ScrollView } from 'react-native'

import {
    Header,
    Title,
    Footer,
    FooterTab,
    Icon,
    Button,
    Left,
    Right,
    Body,
    Text,
    Card,
    CardItem,
    List,
    Container,
    StyleProvider,
    Content
} from 'native-base'
import getTheme from '../../../../native-base-theme/components'

import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'

import { LoadingIndicator } from '../../components/Foundation'

import Colors from '../../style/Colors';
import renderChart from './ChartRenderer';
import ListItem from '../../../../native-base-theme/components/ListItem';

const CONTAINER_PADDING = 10
const CARD_PADDING = 10

export default function renderContent({
    ministry,
    stats
}) {
    const content = statsContent(stats)

    // return (
    //     <StyleProvider style={getTheme()}>
    //         <Container>
    //             {header(ministry.name)}
    //             <Content style={{padding: 10}}>
    //                 {content}
    //             </Content>
    //             {footer()}
    //         </Container>
    //     </StyleProvider>
    // )
    return (

        <HeaderlessRootContainer
            headerContent={header(ministry.data.name)}
            footerContent={footer()}
            style={{ padding: 10, alignItems: null }}>
            {content}
        </HeaderlessRootContainer>
    )
}

function statsContent(stats) {
    const statsStatus = stats.status
    const statsData = stats.data

    console.log('Got data')
    console.log(statsData)

    switch (statsStatus) {
        case StatsStatus.GETTING:
            return loading()
        case StatsStatus.READY:
            return renderCharts(statsData)
        case StatsStatus.NONE:
            return loading()
        case StatsStatus.ERROR:
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

const chartWidth = Dimensions.get('window').width - CONTAINER_PADDING - CARD_PADDING

function renderCharts(statsArray) {
    let chartCards =
        statsArray
            .map(stat => {
                return {
                    label: stat.label,
                    chart: renderChart(stat.type, stat.data, chartWidth)
                }
            })
            .map(({ label, chart }) => renderChartCard(label, chart))
    // .map(chartCard => (<ListItem>{chartCard}</ListItem>))
    console.log(chartCards)

    return (

        chartCards

    )
}

function renderChartCard(label, chart) {
    // return (
    //     <View style={{ flex: 1 }}>
    //         {chart}
    //     </View>
    // )
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

function header(ministryName) {
    /*
        Flex 3 allows the title to be longer
    */

    return (
        <Header iosBarStyle="light-content">
            <Left />
            <Body style={{ flex: 3 }}>
                <Title>{ministryName}</Title>
            </Body>
            <Right />
        </Header>
    )
}

function footer() {
    return (
        <Footer>
            <FooterTab>
                <Button vertical active>
                    <Icon name="stats" />
                    <Text>Stats</Text>
                </Button>
                <Button vertical>
                    <Icon name="heart" />
                    <Text>Share</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
    // return (
    //     <Footer style={{ backgroundColor: Colors.primary }}>
    //         <FooterTab>
    //             <Button full primary>
    //                 <Text style={{ color: 'white', fontSize: 16 }}>Share now</Text>
    //             </Button>
    //         </FooterTab>
    //     </Footer>
    // )
}