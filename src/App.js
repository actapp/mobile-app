import React, { Component } from 'react'

import { StatusBar, View } from 'react-native'

import { connect } from 'react-redux'

import { createAppContainer } from 'react-navigation'
import createAppNavigator from './AppRouteConfig'

import codePush from 'react-native-code-push'

import AppConnect from './AppConnect'

import WelcomeScreen from './presentation/screens/welcome/WelcomeScreen'
import HomeScreen from './presentation/screens/home/HomeScreen'
import AdminHomeScreen from './presentation/screens/home/AdminHomeScreen'

import { LoadingIndicator } from './presentation/components/Foundation'
import Styles from './presentation/style/Styles'

import { PAGE_HOME } from './core/analytics/AnalyticsConstants'
import { trackPage } from './core/analytics/AnalyticsInteractor'

import AppRouter from "./AppRouter";
import GetStartedScreen from './presentation/screens/welcome/GetStartedScreen';

trackPage(PAGE_HOME)

class App extends Component {
    static ERROR_SOURCE = 'App'

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        StatusBar.setBarStyle('light-content')

        this.props.listenForAuthChanges()
        this.routeToScreen()

        this.welcomeTimeout = setTimeout(() => {
            this.props.timeout(App.ERROR_SOURCE)
        }, 10000)
    }

    componentDidUpdate() {
        this.routeToScreen()
    }

    componentWillUnmount() {
        clearTimeout(this.welcomeTimeout)
        this.props.stopListeningForAuthChanges()
    }

    render() {
        return (
            <View style={Styles.centeredRootContainer}>
                <LoadingIndicator />
            </View>
        )
    }

    routeToScreen = () => {
        AppRouter.routeByState({
            ...this.props,
            goToWelcome: this.goToWelcome,
            goToSharerHome: this.goToHome,
            goToAdminHome: this.goToAdminHome,
            checkForContacts: this.props.checkForContacts
        })
    }

    goToWelcome = () => {
        clearTimeout(this.welcomeTimeout)

        // this.props.navigation.replace(WelcomeScreen.KEY)
        this.props.navigation.replace(GetStartedScreen.KEY)
    }

    goToHome = () => {
        clearTimeout(this.welcomeTimeout)
        this.props.navigation.replace(HomeScreen.KEY)
    }

    goToAdminHome = () => {
        clearTimeout(this.welcomeTimeout)
        this.props.navigation.replace(AdminHomeScreen.KEY)
    }
}

const appNavigator = createAppNavigator(
    connect(AppConnect.mapStateToProps, AppConnect.mapDispatchToProps)(App)
)

const appContainer = createAppContainer(appNavigator);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export default codePush(codePushOptions)(appContainer)