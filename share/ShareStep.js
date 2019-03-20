import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Button, Icon, Container, Text } from 'native-base';

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

function confirmStepCompleted(navToNext) {
    Alert.alert(
        'Confirm',
        'Did you complete the questions?',
        [
            {
                text: 'No',
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => { navToNext() } },
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
            onPress={() => { confirmStepCompleted(navToNext) }}
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
        <Container>
            <View flex style={styles.stepContainer}>
                {renderShareContent(contentObj)}
                {navBar}
            </View>
        </Container>
    )
}

function renderStep(content) {
    return (
        class Step extends React.Component {
            static navigationOptions = {
                title: content.title
            }

            render() {
                let nextFunc = null;

                if(content.nextKey != null) {
                    nextFunc = () => { this.props.navigation.navigate(content.nextKey) }
                }

                return renderShareStep(content,
                    renderNavBar(() => this.props.navigation.goBack(), nextFunc))
            }
        }
    )
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#000000',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
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