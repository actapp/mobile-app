import { getSteps } from '../../core/share/ShareInteractor'

export default class ShareRedux {
    static reducer = (state = {
        steps: null,
        error: null,
        session: {
            currentStepIndex: 0,
            canGoBack: false,
            canGoForward: false
        },
        gettingSteps: false,
    }, action) => {
        if (!isShareAction(action)) {
            return state
        }

        const newState = { ...state, gettingSteps: false, error: null }

        if (action.type == ActionTypes.GETTING_STEPS) {
            return { ...newState, gettingSteps: true }
        }

        if (isSessionAction(action)) {
            return ShareRedux.shareSessionReducer(newState, action)
        }

        switch (action.type) {
            case ActionTypes.GOT_STEPS:
                return { ...newState, steps: action.payload }
            case ActionTypes.GET_STEPS_ERROR:
                return { ...newState, error: action.payload }
            default:
                return newState
        }
    }

    static shareSessionReducer = (state, action) => {
        switch (action.type) {
            case ActionTypes.START_SESSION:
                return startSession(state, action.payload)
            case ActionTypes.NEXT_STEP:
                return getNextStep(state)
            case ActionTypes.PREVIOUS_STEP:
                return getPreviousStep(state)
            default:
                return state
        }
    }
}

export class ShareActions {
    static getSteps = () => {
        return function (dispatch) {
            dispatch(ShareActions.gettingSteps())

            getSteps()
                .then(steps => {
                    dispatch(ShareActions.gotSteps(steps))
                })
                .catch(error => {
                    dispatch(ShareActions.getStepsError(error))
                })
        }
    }

    static gettingSteps = () => ({
        type: ActionTypes.GETTING_STEPS
    })

    static gotSteps = (steps) => ({
        type: ActionTypes.GOT_STEPS,
        payload: steps
    })

    static getStepsError = (error) => ({
        type: ActionTypes.GET_STEPS_ERROR,
        payload: error
    })

    static checkStepsAndStartSession = (contactId, startIndex) => {
        return function (dispatch, getState) {
            if (getState.steps == null) {
                dispatch(ShareActions.gettingSteps())

                getSteps()
                    .then(steps => {
                        dispatch(ShareActions.gotSteps(steps))
                        dispatch(ShareActions.startSession(contactId, startIndex))
                    })
                    .catch(error => {
                        dispatch(ShareActions.getStepsError(error))
                    })
            } else {
                dispatch(ShareActions.startSession(contactId, startIndex))
            }
        }
    }

    static startSession = (contactId, startIndex) => ({
        type: ActionTypes.START_SESSION,
        payload: {
            contactId: contactId,
            startIndex: startIndex
        }
    })

    static nextStep = () => ({
        type: ActionTypes.NEXT_STEP
    })

    static previousStep = () => ({
        type: ActionTypes.PREVIOUS_STEP
    })
}

const SHARE_PREFIX = 'share/'
const SESSION_ACTION_PREFIX = SHARE_PREFIX + 'session/'
function isShareAction(action) {
    return action.type.startsWith(SHARE_PREFIX)
}

function isSessionAction(action) {
    return action.type.startsWith(SESSION_ACTION_PREFIX)
}

function startSession(state, startPayload) {
    const { steps } = state
    const { contactId, startIndex } = startPayload

    const newSession = {
        contactId: contactId,
        currentStepIndex: startIndex,
        canGoForward: startIndex < steps.length - 1,
        canGoBack: startIndex > 0
    }

    return { ...state, session: newSession }
}

function getNextStep(state) {
    const { steps, session } = state
    const { canGoBack, canGoForward, currentStepIndex } = session

    let newStepIndex = currentStepIndex
    let newCanGoForward = canGoForward
    let newCanGoBack = canGoBack
    if (currentStepIndex < steps.length - 1) {
        newStepIndex += 1
        newCanGoForward = newStepIndex < steps.length - 1
        newCanGoBack = true
    } else {
        // Do nothing
        newCanGoForward = false
    }

    const newSession = {
        ...session,
        currentStepIndex: newStepIndex,
        canGoBack: newCanGoBack,
        canGoForward: newCanGoForward
    }

    return { ...state, session: newSession }
}

function getPreviousStep(state) {
    const { session } = state
    const { canGoBack, canGoForward, currentStepIndex } = session

    let newStepIndex = currentStepIndex
    let newCanGoBack = canGoBack
    let newCanGoForward = canGoForward
    if (currentStepIndex > 0) {
        newStepIndex -= 1
        newCanGoBack = newStepIndex > 0
        newCanGoForward = true
    } else {
        newCanGoBack = false
    }

    const newSession = {
        ...session,
        currentStepIndex: newStepIndex,
        canGoBack: newCanGoBack,
        canGoForward: newCanGoForward
    }

    return { ...state, session: newSession }
}

class ActionTypes {
    static GETTING_STEPS = SHARE_PREFIX + 'getting_steps'
    static GET_STEPS_ERROR = SHARE_PREFIX + 'get_steps_error'
    static GOT_STEPS = SHARE_PREFIX + 'steps_retrieved'

    static START_SESSION = SESSION_ACTION_PREFIX + 'start'
    static NEXT_STEP = SESSION_ACTION_PREFIX + 'next'
    static PREVIOUS_STEP = SESSION_ACTION_PREFIX + 'prev'
}