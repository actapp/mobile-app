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
                        label: 'Lifetime',
                        type: 'COUNTS',
                        data: [
                            {
                                label: 'Saved',
                                data: 100,
                                color: '#48a999'
                            },
                            {
                                label: 'Unsaved',
                                data: 50,
                                color: '#ffb04c'
                            },
                            {
                                label: 'Undecided',
                                data: 30,
                                color: '#fff263'
                            }
                        ]
                    },
                    {
                        label: 'This month',
                        type: 'PIE',
                        data: [
                            {
                                label: 'Saved',
                                data: 12,
                                color: '#48a999'
                            },
                            {
                                label: 'Unsaved',
                                data: 3,
                                color: '#ffb04c'
                            },
                            {
                                label: 'Undecided',
                                data: 9,
                                color: '#fff263'
                            }
                        ]
                    },
                    {
                        label: 'This year',
                        type: 'STACKED',
                        data: [
                            {
                                label: 'Q1',
                                data: [
                                    {
                                        label: 'Saved',
                                        data: 50,
                                        color: 'white'
                                    },
                                    {
                                        label: 'Unsaved',
                                        data: 10,
                                        color: 'red'
                                    },
                                    {
                                        label: 'Undecided',
                                        data: 15,
                                        color: 'yellow'
                                    }
                                ]
                            },

                            {
                                label: 'Q2',
                                data: [
                                    {
                                        label: 'Saved',
                                        data: 60,
                                        color: 'white'
                                    },
                                    {
                                        label: 'Unsaved',
                                        data: 7,
                                        color: 'red'
                                    },
                                    {
                                        label: 'Undecided',
                                        data: 25,
                                        color: 'yellow'
                                    }
                                ]
                            },

                            {
                                label: 'Q3',
                                data: [
                                    {
                                        label: 'Saved',
                                        data: 30,
                                        color: 'white'
                                    },
                                    {
                                        label: 'Unsaved',
                                        data: 1,
                                        color: 'red'
                                    },
                                    {
                                        label: 'Undecided',
                                        data: 25,
                                        color: 'yellow'
                                    }
                                ]
                            },
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