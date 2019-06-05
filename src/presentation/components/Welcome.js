import React, { Component } from 'react'
import { Image } from 'react-native'
import { Text } from 'native-base'

import * as Animatable from 'react-native-animatable'

import Styles from '../style/Styles'

export class StaticHeader extends Component {
    render() {
        return (
            <>
                <Image
                    source={require('../../assets/ic_logo.png')}
                    style={imageStyle}
                />
                <Text style={titleStyle}>
                    MySharePal
            </Text>
            </>
        )
    }
}

export function subtitle(text, additionalStyling) {
    return (
        <Text
            style={{
                ...Styles.bigHeaderSubtitle,
                textAlign: 'center',
                ...additionalStyling
            }}
        >
            {text}
        </Text>
    )
}

export function staticHeader() {
    return (
        <>
            <Image
                source={require('../../assets/ic_logo.png')}
                style={imageStyle}
            />
            <Text style={titleStyle}>
                MySharePal
            </Text>
        </>
    )
}

export function animatedHeader() {
    return (
        <>
            <Animatable.Image
                source={require('../../assets/ic_logo.png')}
                style={imageStyle}
                onAnimationEnd={onAnimationEnd}
            /> ,
            <Animatable.Text
                style={titleStyle}
            >
                MySharePal
            </Animatable.Text>
        </>
    )
}

const imageStyle = {
    width: 80,
    height: 80
}

const titleStyle = {
    ...Styles.bigHeader,
    marginBottom: 50
}