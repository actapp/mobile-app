import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Container, CheckBox } from 'native-base';

const styles = StyleSheet.create({
    transparentCard: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        margin: 10,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 1,
        borderColor: 'white'
    },

    cardText: {
        width: '100%',
        height: '80%',
        color: 'white' ,
        fontSize: 24,
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
        flexWrap: 'wrap'
    }
})

class Card extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onChecked: PropTypes.func.isRequired
    }

    state = {
        checked: false
    }

    onCheckChanged = () => {
        this.setState({checked: !this.state.checked})
    }

    render() {
        const { text } = this.props

        return (
            <View style={styles.transparentCard}>
                <Text style={styles.cardText}>Hi</Text>
            </View>
        )
    }
}

export class CardDeck extends Component {
    static propTypes = {
        textItems: PropTypes.array,
        completeText: PropTypes.string,
        onDeckCompleted: PropTypes.func
    }

    state = {
        currentCardIndex: 0
    }

    render() {
        const index = this.state.currentCardIndex
        const items = this.props.textItems
        const currentCardIsLast = (index == (items.length - 1));

        return this.itemToCard(index, items[index], currentCardIsLast)
    }

    itemToCard = (index, item, isLast) => {
        return (
            <Card
                text={item}
                onChecked={(checked) => {
                    // Show next card
                    if (isLast) {
                        this.props.onDeckCompleted()
                    } else {
                        this.setState({ currentCardIndex: index + 1})
                    }
                }} />
        )
    }
}

export default CardDeck;