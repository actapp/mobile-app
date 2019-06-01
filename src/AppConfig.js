import { getCurrentUser, logOut } from './core/LogInInteractor'
import { deleteAccount } from './core/account/AccountInteractor'

export default AppConfig = {
    initialize: initializeConfiguration,

    MOCK_SERVICES: {
        'react-native-firebase': {
            shouldUse: true,

            auth: {
                // User to have logged in upon start
                loggedInUser: {
                    uid: '123',
                    phoneNumber: '+15555555555'
                },

                // User that exists on the 'back end', but is not logged in locally
                // existingUser: {
                //     uid: '123',
                //     phoneNumber: '+15555555555'
                // }
            },
            firestore: {
                collections: {
                    // Existing users in "back end"
                    users: {
                        '123': {
                            account: {
                                id: '123',
                                role: 'SHARER',
                                ministryId: 'AA000'
                            },
                            contacts: [
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                                {
                                    name: 'Joe',
                                    phone: '5134033455',
                                    currentStepIndex: 0,
                                    currentStepDesc: 'Spiritual beliefs',
                                    id: '456'
                                },
                            ]
                        }
                    },

                    // Existing ministries in "back end"
                    ministries: {
                        'AA000': {
                            name: 'My Cool Ministry',
                            id: 'AA000',
                            data: {}
                        }
                    }
                }
            }
        },
        'stats': {
            shouldUse: true,

            leader: {

            },

            sharer: {
                charts: [
                    {
                        label: 'MySharePal Community',
                        data: [
                            {
                                label: 'Spiritual convos',
                                data: 423,
                                color: '#7a7cff'
                            },
                            {
                                label: 'Accepted Christ',
                                data: 315,
                                color: '#0026ca'
                            }
                        ]
                    },
                    {
                        label: 'My Cool Ministry',
                        data: [
                            {
                                label: 'Spiritual convos',
                                data: 115,
                                color: '#7a7cff'
                            },
                            {
                                label: 'Saved',
                                data: 50,
                                color: '#0026ca'
                            }
                        ]
                    },
                    {
                        label: 'Me',
                        data: [
                            {
                                label: 'Spiritual convos',
                                data: 33,
                                color: '#7a7cff'
                            },
                            {
                                label: 'Saved',
                                data: 10,
                                color: '#0026ca'
                            }
                        ]
                    }
                ]
            }
        }
    },

    // Mock delay for loading (i.e. when using mock firestore)
    MOCK_DELAY: 0,

    // App
    FORCE_FRESH_START: false,

    // Authentication
    FORCE_LOGOUT: false,

    // Account
    FORCE_NEW_ACCOUNT: __DEV__,

    // Animation
    SKIP_ANIMATIONS: false,
    defaultAnimDuration: () => duration(1000),
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
    return AppConfig.SKIP_ANIMATIONS ? 1 : duration
}   