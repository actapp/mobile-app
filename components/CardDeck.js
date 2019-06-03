import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PlatformFonts, PlatformIcons, Colors } from '../Styles';

const styles = StyleSheet.create({
    transparentCard: {
        width: '100%',
        margin: 20,
        padding: 15,
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white'
    },

    cardText: {
        color: 'white',
        padding: 10,
        fontSize: 20,
        fontFamily: PlatformFonts.light,
        textAlign: 'center',
        flexWrap: 'wrap'
    },

    cardAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    cardActionLabel: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },

    test: {}
})

class Card extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        completeText: PropTypes.string,
        onUp: PropTypes.func.isRequired,
        onDown: PropTypes.func.isRequired,
        isUpEnabled: PropTypes.bool,
        isDownEnabled: PropTypes.bool
    }

    state = {
        checked: false
    }

    onCheckChanged = () => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        const { text, onUp, onDown, isUpEnabled, isDownEnabled } = this.props

        return (
            // <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.transparentCard}>
                <Text style={{ ...styles.cardText, marginBottom: 20 }}>{text}</Text>

                <View style={{ borderBottomWidth: 0.5, borderColor: 'white', marginBottom: 15 }} />
                <View style={{ flexDirection: 'row' }}>
                    {this.button('ios-arrow-up', isUpEnabled, onUp)}
                    {this.button('ios-arrow-down', isDownEnabled, onDown)}
                </View>
            </View>
            // </ScrollView>
        )
    }

    button = (icon, isEnabled, onPressIfEnabled) => {
        const color = isEnabled ? 'white' : Colors.grayedOut;

        return (<TouchableOpacity style={{ ...styles.cardAction, flex: 1 }}
            onPress={isEnabled ? onPressIfEnabled : null}>
            <Icon name={icon} size={20} color={color} />
        </TouchableOpacity>)
    }
}

export class CardDeck extends Component {
    static propTypes = {
        textItems: PropTypes.array,
        completeText: PropTypes.string,
        lastCompleteText: PropTypes.string,
        onLastCardShowing: PropTypes.func,
        onDeckCompleted: PropTypes.func
    }

    state = {
        currentCardIndex: 0
    }

    constructor(props) {
        super(props)
    }

    incrementCurrentIndex = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex + 1 })
    }

    decrementCurrentIndex = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex - 1 })
    }

    render() {
        const index = this.state.currentCardIndex
        const items = this.props.textItems
        const completeText = this.props.completeText
        const lastCompleteText = this.props.lastCompleteText
        const currentCardIsFirst = this.state.currentCardIndex == 0
        const currentCardIsSecondLast = (index == (items.length - 2));
        const currentCardIsLast = (index == (items.length - 1));
        const onLastCardShowing = this.props.onLastCardShowing;
        const onCompleted = this.props.onDeckCompleted;

        return (<Card
            text={items[index]}
            completeText={currentCardIsLast ? lastCompleteText : completeText}
            isUpEnabled={!currentCardIsFirst}
            isDownEnabled={!currentCardIsLast}
            onUp={() => {
                this.decrementCurrentIndex()
            }}
            onDown={() => {
                if (currentCardIsSecondLast) {
                    onLastCardShowing()
                }

                // Show next card
                this.incrementCurrentIndex()
            }}
        />)
    }
}

export default CardDeck;
