import React, { Component } from 'react'
import { Container, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components'

export default class HeaderlessRootContainer extends Component {
    render() {
        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    {this.props.children}
                </Container>
            </StyleProvider>
        )
    }
}