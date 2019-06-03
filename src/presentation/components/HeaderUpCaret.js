import React, { Component } from 'react'

import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlatformIcons } from '../style/Icons';

export default class HeaderUpCaret extends Component {
    render = () => (
        <Button
            iconLeft
            light
            transparent
            onPress={this.props.onPress}>
            <Icon
                name={PlatformIcons.name('arrow-back')}
                color='white'
                size={25}
                style={{ paddingRight: 10 }}
            />
        </Button>
    )
}