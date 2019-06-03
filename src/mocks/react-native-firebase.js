import MockAuth from './MockAuth'
import MockFirestore from './MockFirestore'
import AppConfig from '../AppConfig';

let initialConfig = AppConfig.MOCK_SERVICES['react-native-firebase']
if(!initialConfig) {
    initialConfig = {
        auth: {},
        firestore: {
            collections: {}
        }
    }
}

let mockAuth = new MockAuth(initialConfig.auth)
const auth = () => mockAuth

let mockFs = new MockFirestore(initialConfig.firestore)
const firestore = () => mockFs

const firebase = {
    auth: auth,
    firestore: firestore,
    configure: configureMock
}

function configureMock(config) {
    mockAuth = new MockAuth(config.auth)
    mockFs = new MockFirestore(config.firestore)
}

export {
    firebase
}