import React from 'react'

import { Header, Title, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import HeaderlessRootContainer from '../../components/HeaderlessRootContainer'
import Colors from '../../style/Colors';

export default function renderContent({
    account,
    ministry
}) {
    const text = "\n\nTEST DATA\nWelcome, user.\nYour ministry code is: "
                    + ministry.data.id
                    + "\nYour ministry name is: "
                    + ministry.data.name
                    + "\nYour role is: "
                    + account.data.role
    return (
        <HeaderlessRootContainer
            headerContent={header(ministry.data.name)}
            footerContent={footer()}>
            <Text>
                {text}
            </Text>
        </HeaderlessRootContainer>
    )
}

function header(ministryName) {
    /*
        Flex 3 allows the title to be longer
    */

    return (
        <Header iosBarStyle="light-content">
            <Left />
            <Body style={{flex: 3}}>
                <Title>{ministryName}</Title>
            </Body>
            <Right />
        </Header>
    )
}

function footer() {
    return (
        <Footer style={{backgroundColor: Colors.primary}}>
            <FooterTab>
                <Button full primary>
                    <Text style={{color: 'white', fontSize: 16}}>Share now</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
}