import React, { Component } from 'react'
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components'

import Styles from '../style/Styles'

export default class HeaderlessRootContainer extends Component {
    render() {
        const containerStyle = this.props.style
        const {
            headerContent,
            footerContent,
            padder
        } = this.props

        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    {headerContent}
                    <Content
                        contentContainerStyle={{ alignItems: 'center', ...containerStyle }}
                    >
                        {this.props.children}
                    </Content>
                    {footerContent}
                </Container>
            </StyleProvider>
        )
    }
}