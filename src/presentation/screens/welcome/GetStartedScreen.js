import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../../native-base-theme/components';

export default class GetStartedScreen extends Component {
    static KEY = 'GetStartedScreen'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    state = {
        steps: null,
        currentStepIndex: 0
    }

    componentDidMount() {

    }

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <Content>
                        <Text>
                            This is content
                    </Text>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button full>
                                <Text>Next</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        )
    }
}