import { getCurrentUser, logOut } from './core/LogInInteractor'
import { deleteAccount } from './core/account/AccountInteractor'

export default AppConfig = {
    initialize: initializeConfiguration,

    MOCK_SERVICES: {
        'react-native-firebase': {
            auth: {
                // User to have logged in upon start
                loggedInUser: null,

                // User that exists on the 'back end', but is not logged in locally
                existingUser: {
                    uid: '123',
                    phoneNumber: '+15555555555'
                }
            },
            firestore: {
                collections: {
                    users: {
                        '123': {
                            account: {
                                role: 'LEADER',
                                ministryId: 'AA000'
                            }
                        }
                    },
                    ministries: {
                        'AA000': {
                            id: 'AA000',
                            data: {}
                        }
                    }
                }
            }
        }
    },

    // App
    FORCE_FRESH_START: false,

    // Authentication
    FORCE_LOGOUT: false,

    // Account
    FORCE_NEW_ACCOUNT: __DEV__,

    // Animation
    DEFAULT_ANIM_DURATION: duration(1000),
    animDuration: duration
}

/**
 * Run any custom initialization 
 */
function initializeConfiguration() {
    global.objLog = {
        log: obj => console.log(JSON.stringify(obj))
    }

    if (AppConfig.FORCE_FRESH_START || AppConfig.FORCE_NEW_ACCOUNT) {
        const user = getCurrentUser()

        if (user != null) {
            deleteAccount(getCurrentUser().uid).then().catch(error => { console.log(error) })
        }
    }

    if (AppConfig.FORCE_FRESH_START || AppConfig.FORCE_LOGOUT) {
        logOut().then().catch(error => { console.log(error) })
    }
}

/**
 * Given a duration, will make it instantaneous if currently in DEV environment
 */
function duration(duration) {
    return (__DEV__) ? 1 : duration
}