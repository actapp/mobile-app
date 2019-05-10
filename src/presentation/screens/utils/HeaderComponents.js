import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { PlatformIcons } from '../../style/Icons'
import Icon from 'react-native-vector-icons/Ionicons'

export function renderUpButton(onPressed) {
    return (
        <TouchableOpacity
            onPress={onPressed}>
            <Icon name={PlatformIcons.name('arrow-back')} size={25} color='white' style={{ marginLeft: 15 }} />
        </TouchableOpacity>
    )
}