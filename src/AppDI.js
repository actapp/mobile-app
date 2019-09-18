import AppConfig from './AppConfig';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';

// export const firebase = shouldMock('react-native-firebase') ? require('./mocks/react-native-firebase').firebase : require('react-native-firebase')
export const auth = shouldMock('react-native-firebase') ? require('./mocks/react-native-firebase').firebase.auth : firebaseAuth;
export const firestore = shouldMock('react-native-firebase') ? require('./mocks/react-native-firebase').firebase.firestore : firebaseFirestore;
export const StatsService = shouldMock('stats') ? require('./mocks/MockStatsService').default : require('./core/stats/StatsService')

function shouldMock(moduleName) {
    return AppConfig.MOCK_SERVICES[moduleName] != null && AppConfig.MOCK_SERVICES[moduleName].shouldUse == true
}