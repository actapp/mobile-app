import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PlatformFonts, PlatformIcons, Colors } from '../Styles';

const styles = StyleSheet.create({
    transparentCard: {
        margin: 20,
        padding: 15,
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white'
    },

    cardText: {
        color: 'white',
        fontSize: 24,
        fontFamily: PlatformFonts.light,
        textAlign: 'center',
        flexWrap: 'wrap'
    },

    cardAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardActionLabel: {
        width: '50%',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})

class Card extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        completeText: PropTypes.string,
        onChecked: PropTypes.func.isRequired
    }

    state = {
        checked: false
    }

    onCheckChanged = () => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        const { text, completeText, onChecked } = this.props

        return (
            <View style={styles.transparentCard}>
                <Text style={{ ...styles.cardText, marginBottom: 30 }}>{text}</Text>

                <View style={{ borderBottomWidth: 0.5, borderColor: 'white', marginBottom: 15 }} />
                <TouchableOpacity style={styles.cardAction}
                    onPress={onChecked}>
                    <Icon name={PlatformIcons.name('checkmark-circle-outline')} size={30} color={Colors.primary} />
                    <Text style={styles.cardActionLabel}>{completeText}</Text>
                </TouchableOpacity>
            </View>
        )
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
        console.log(this.props)
    }

    incrementCurrentIndex = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex + 1 })
    }

    render() {
        const index = this.state.currentCardIndex
        const items = this.props.textItems
        const completeText = this.props.completeText
        const lastCompleteText = this.props.lastCompleteText
        const currentCardIsSecondLast = (index == (items.length - 2));
        const currentCardIsLast = (index == (items.length - 1));
        const onLastCardShowing = this.props.onLastCardShowing;
        const onCompleted = this.props.onDeckCompleted;

        return (<Card
            text={items[index]}
            completeText={currentCardIsLast ? lastCompleteText : completeText}
            onChecked={() => {
                // Show next card
                if (currentCardIsLast) {
                    onCompleted()
                } else {
                    if(currentCardIsSecondLast) {
                        onLastCardShowing()
                    }

                    this.incrementCurrentIndex()
                }
            }} />)
    }
}

export default CardDeck;