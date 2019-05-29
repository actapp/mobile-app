import AppConfig from './AppConfig';

export const firebase = shouldMock('react-native-firebase') ? require('./mocks/react-native-firebase').firebase : require('react-native-firebase')
export const StatsService = shouldMock('stats') ? require('./mocks/MockStatsService').default : require('./core/stats/StatsService')

function shouldMock(moduleName) {
    return AppConfig.MOCK_SERVICES[moduleName] != null && AppConfig.MOCK_SERVICES[moduleName].shouldUse == true
}