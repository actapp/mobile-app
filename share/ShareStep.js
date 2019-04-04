import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import CardDeck from '../components/CardDeck';
import { PlatformFonts, PlatformIcons } from '../Styles';
import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from '../AnalyticsConstants';

function renderNavBar(onBack, onNext, isNextEnabled) {
    const buttons = []
    if (onBack != null) {
        buttons.push(createBackButton(onBack))
    }
    if (onNext != null) {
        buttons.push(createNextButton(onNext, isNextEnabled))
    }

    return (
        <View style={styles.navContainer}>
            {buttons}
        </View>
    )
}

function createBackButton(onPress) {
    return (
        <TouchableOpacity
            label='Back'
            onPress={onPress}
            style={styles.navButton}
            key={onPress}>
            <Icon name={PlatformIcons.name('arrow-back')} size={20} color='white' style={{ marginRight: 15 }} />
            <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
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

function alert(title, msg) {
    Alert.alert(
        title,
        msg
    )
}

function createNextButton(navToNext, isEnabled) {
    let buttonColor = styles.navButton.borderColor
    if (!isEnabled) {
        buttonColor = '#aaaa'
    }

    return (
        <TouchableOpacity
            onPress={navToNext}
            style={{ ...styles.navButton, borderColor: buttonColor }}
            disabled={!isEnabled}
            key={navToNext}>
            <Text style={{ ...styles.navButtonText, color: buttonColor }}>Next</Text>
            <Icon name={PlatformIcons.name('arrow-forward')} size={20} color={buttonColor} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
    )
}

function renderComment(contentObj) {
    return (
        <Text style={{ ...styles.stepText, marginTop: 20, fontFamily: PlatformFonts.light, fontSize: 14, fontStyle: 'italic' }}>
            {contentObj.comments}
        </Text>
    )
}

function renderShareLine(id, text) {
    return (
        <Text key={id} style={{ ...styles.stepText, fontFamily: PlatformFonts.light }}>
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

function renderShareStep(contentObj, navBar, allowNext, onQuestionsCompleted) {
    console.log(onQuestionsCompleted)
    return (
        // <Container>
        //     <View flex style={styles.stepContainer}>
        //         {renderShareContent(contentObj)}
        //         {navBar}
        //     </View>
        // </Container>

        // <ScrollView contentContainerStyle={{
        //     flexGrow: 1,
        //     justifyContent: 'space-between'
        // }}>
            <View flex style={styles.stepContainer}>
                <CardDeck
                    textItems={contentObj.lineItems}
                    completeText='Completed'
                    lastCompleteText='Next'
                    onLastCardShowing={allowNext}
                    onDeckCompleted={onQuestionsCompleted}
                />
                {navBar}
            </View>
        // </ScrollView>
        // <Container>
        // <View flex style={styles.stepContainer}>
        //     <CardDeck
        //         textItems={contentObj.lineItems}
        //         completeText='Completed'
        //         onDeckCompleted={() => { }

        //         } 
        //         style={{ flex: 1, width: '80%'}}/>

        //     {navBar}
        // </View>
        // </Container>
    )
}

function createNextFunc(step, navigation) {
    if (step.nextKey == null) {
        return null
    }

    return () => {
        navigation.navigate(step.nextKey)
        Analytics.trackEvent(AnalyticsConstants.EVENT_STEP_COMPLETED, { [AnalyticsConstants.PARAM_STEP_KEY]: step.key })
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
                title: content.title,
                headerRight: (
                    <TouchableOpacity
                        onPress={() => {
                            alert('Tip', content.comments)
                        }}>
                        <Icon name={PlatformIcons.name('help-circle')} size={25} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
            }

            state = {
                isNextEnabled: false
            }

            allowNext = () => {
                this.setState({ isNextEnabled: true })
            }

            render() {
                const isNextEnabled = this.state.isNextEnabled
                let nextFunc = createNextFunc(content, this.props.navigation)
                if (nextFunc == null) {
                    // No next function; assume this must be the last step
                    nextFunc = createCompleteFunc(content, this.props.navigation)
                }

                return renderShareStep(content,
                    renderNavBar(() => this.props.navigation.goBack(), nextFunc, isNextEnabled), this.allowNext, nextFunc)
            }
        }
    )
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
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
        marginBottom: 10,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white'
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    stepText: {
        marginBottom: 20,
        color: '#ffffff',
        fontSize: 18
    }
})

export { renderStep };