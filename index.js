/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

import { Provider } from 'react-redux';
import GlobalRedux from './src/presentation/redux/GlobalRedux'

console.log('Registering ' + appName)

const ReduxApp = () => {
    return <Provider store={GlobalRedux.store}>
        <App />
    </Provider>
}

AppRegistry.registerComponent(appName, () => ReduxApp);
