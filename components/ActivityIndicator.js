import React, { Component } from 'react';
import { ActivityIndicator as ActivityIndicatorModule } from 'react-native';
import { Colors } from '../Styles'

export const ActivityIndicator = {
    render: () => {
        <ActivityIndicatorModule size="large" color={Colors.primary} />
    }
}
