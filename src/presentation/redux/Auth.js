import { setAuthenticationListener } from '../../core/LogInInteractor'

export default AuthRedux = {
    Status: Status,
    Actions: Actions,
    reducer: reducer
}

const Status = {
    NOT_READY: 'NOT_READY',
    LOGGED_OUT: 'LOGGED_OUT',
    LOGGED_IN: 'LOGGED_IN',
    ERROR: 'ERROR'
}

const Actions = {
    loggedOut: simpleActionCreator(ActionTypes.LOGGED_OUT),
    loggedIn: simpleActionCreator(ActionTypes.LOGGED_IN),
    error: (errorInfo) => ({
        type: ActionTypes.ERROR,
        payload: errorInfo
    }),

    listenForAuthChanges: listenForAuthChanges,
    stopListeningForAuthChanges: stopListeningForAuthChanges
}

const ActionTypes = {
    LOGGED_OUT: actionType(Status.LOGGED_OUT),
    LOGGED_IN: actionType(Status.LOGGED_IN),
    ERROR: actionType(Status.ERROR)
}

const simpleActionCreator = type => () => ({ type })

function reducer(state = {
    status: AuthStatus.NOT_READY
}, action) {
    switch (action.type) {
        case ActionTypes.LOGGED_OUT:
        case ActionTypes.LOGGED_IN:
            return { ...state, status: action.type }
        case ActionTypes.ERROR:
            return { ...state, status: action.type, error: action.payload }
        default:
            return state
    }
}

function actionType(type) {
    return 'auth/' + type
}

let unsubscribeFromAuth = null
function listenForAuthChanges(dispatch, { getState }) {
    if (unsubscribeFromAuth) {
        // Ignore -- already listening globally for auths
        return
    }

    console.log(`Listening for auth changes...`)

    const listener = (user) => {
        console.log('Auth user changed: ' + user)

        if (user == null) {
            dispatch(Actions.loggedOut())
        } else if (user.uid !== getUidFromState(getState())) {
            dispatch(Actions.loggedIn())
        }
    }

    unsubscribeFromAuth = setAuthenticationListener(listener)
}

function getUidFromState(state) {
    if (state.user != null) {
        return state.user.uid
    }

    return null
}

function stopListeningForAuthChanges() {
    if (unsubscribeFromAuth != null) {
        unsubscribeFromAuth()
        unsubscribeFromAuth = null
    }
}