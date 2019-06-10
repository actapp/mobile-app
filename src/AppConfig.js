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
                            convos: 22,
                            conversions: 13 
                        //     contacts: [
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //         {
                        //             name: 'Joe',
                        //             phone: '5134033455',
                        //             currentStepIndex: 0,
                        //             currentStepDesc: 'Spiritual beliefs',
                        //             id: '456'
                        //         },
                        //     ]
                        }
                    },

                    // Existing ministries in "back end"
                    ministries: {
                        'AA000': {
                            name: 'Tree of Life Ministry',
                            id: 'AA000',
                            data: {},
                            convos: 150,
                            conversions: 98

                        }
                    },

                    global: {
                        global: {
                            convos: 307,
                            conversions: 124
                        }
                    }
                }
            }
        },        
    },

    // Mock delay for loading (i.e. when using mock firestore)
    MOCK_DELAY: 0,

    // App
    FORCE_FRESH_START: false,

    // Authentication
    FORCE_LOGOUT: false,

    // Account
    FORCE_NEW_ACCOUNT: false,

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