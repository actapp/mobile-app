import React, { Component } from 'react'
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components'

import Styles from '../style/Styles'

export default class HeaderlessRootContainer extends Component {
    render() {
        const containerStyle = this.props.style
        const { footerContent } = this.props

        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <Content contentContainerStyle={{ ...Styles.rootContainer, width: '100%', ...containerStyle }}>
                        {this.props.children}
                    </Content>
                    {footerContent}
                </Container>
            </StyleProvider>
        )
    }
}