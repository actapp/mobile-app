import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Button, Icon, Container, Text } from 'native-base';
import CardDeck from '../components/CardDeck';
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from '../AnalyticsConstants';

function renderNavBar(onBack, onNext) {
    const buttons = []
    if (onBack != null) {
        buttons.push(createBackButton(onBack))
    }
    if (onNext != null) {
        buttons.push(createNextButton(onNext))
    }

    return (
        <View style={styles.navContainer}>
            {buttons}
        </View>
    )
}

function createBackButton(onPress) {
    return (
        <Button
            light
            iconLeft
            bordered
            onPress={onPress}
            style={{ color: 'white' }}
            key={onPress}>
            <Icon name='arrow-back' />
            <Text>BACK</Text>
        </Button>
    )
}

function confirm(title, msg, onYes, onNo) {
    Alert.alert(
        title,
        msg,
        [
            {
                text: 'No',
                style: 'cancel',
                onPress: onNo
            },
            {
                text: 'Yes',
                onPress: () => { onYes() }
            },
        ],
        { cancelable: false },
    );
}

function createNextButton(navToNext) {
    return (
        <Button
            light
            iconRight
            bordered
            onPress={navToNext}
            style={{ color: 'white' }}
            key={navToNext}>
            <Text>NEXT</Text>
            <Icon name='arrow-forward' />
        </Button>
    )
}

function renderComment(contentObj) {
    return (
        <Text style={{ ...styles.stepText, marginTop: 20, fontFamily: 'sans-serif-light', fontSize: 14, fontStyle: 'italic' }}>
            {contentObj.comments}
        </Text>
    )
}

function renderShareLine(id, text) {
    return (
        <Text key={id} style={{ ...styles.stepText, fontFamily: 'sans-serif-light' }}>
            {text}
        </Text>
    )
}

function renderShareContent(contentObj) {
    const lines = []

    for (let i = 0; i < contentObj.lineItems.length; i++) {
        lines.push(
            renderShareLine(i, contentObj.lineItems[i])
        )
    }

    return (
        <ScrollView>
            {lines}

            {renderComment(contentObj)}
        </ScrollView>
    )
}

function renderShareStep(contentObj, navBar) {
    return (
        // <Container>
            <View flex style={styles.stepContainer}>
                <CardDeck
                    textItems={contentObj.lineItems}
                    completeText='Completed'
                    onDeckCompleted={() => { }

                    } 
                    style={{ flex: 1, width: '80%'}}/>

                {navBar}
            </View>
        // </Container>
    )
}

function createNextFunc(step, navigation) {
    if (step.nextKey == null) {
        return null
    }

    return () => {
        confirm('Confirm', 'Did you ask all the questions?', () => {
            navigation.navigate(step.nextKey)
            Analytics.trackEvent(AnalyticsConstants.EVENT_STEP_COMPLETED, { [AnalyticsConstants.PARAM_STEP_KEY]: step.key })
        })
    }
}

function onCompleted(navigation, acceptedChrist) {
    navigation.navigate('Home')
    Analytics.trackEvent(AnalyticsConstants.EVENT_SHARE_COMPLETED, { [AnalyticsConstants.PARAM_ACCEPTED_CHRIST]: acceptedChrist })
}

function createCompleteFunc(step, navigation) {
    return () => {
        confirm('Complete', 'Did your friend accept Christ?', () => {
            onCompleted(navigation, true)
        }, () => {
            onCompleted(navigation, false)
        })
    }
}

function renderStep(content) {
    // let nextFunc = createNextFunc(content, this.props.navigation)
    // if (nextFunc == null) {
    //     // No next function; assume this must be the last step
    //     nextFunc = createCompleteFunc(content, this.props.navigation)
    // }

    // return renderShareStep(content,
    //     renderNavBar(() => this.props.navigation.goBack(), nextFunc))

    return (
        class Step extends React.Component {
            static navigationOptions = {
                title: content.title
            }

            render() {
                let nextFunc = createNextFunc(content, this.props.navigation)
                if (nextFunc == null) {
                    // No next function; assume this must be the last step
                    nextFunc = createCompleteFunc(content, this.props.navigation)
                }

                return renderShareStep(content,
                    renderNavBar(() => this.props.navigation.goBack(), nextFunc))
            }
        }
    )
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 10,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flexWrap: 'wrap'
    },
    navContainer: {
        width: '100%',
        height: '20%',
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    navButton: {
        width: 100,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        padding: 10
    },
    navButtonText: {
        color: '#000000',
        fontSize: 12,
        textAlign: 'center'
    },
    stepText: {
        marginBottom: 20,
        color: '#ffffff',
        fontSize: 18
    }
})

export { renderStep };