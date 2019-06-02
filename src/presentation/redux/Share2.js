import { getSteps } from '../../core/share/ShareInteractor'
import { actionCreator } from './util/Util';

function shareReducer(state = {
    status: ShareStatus.NOT_READY,
    steps: null,
    progress: null,
    error: null
}, action) {
    if (!isShareAction(action)) return state

    const newState = { ...state, error: null }

    if (isShareSessionAction(action)) {
        return reduceSessionAction(newState, action)
    } else {
        return reduceStatusAction(newState, action)
    }
}

function isShareAction(action) {
    if (action && action.type) {
        return action.type.startsWith('share/')
    }

    return false
}

function isShareSessionAction(action) {
    if (action && action.type) {
        return action.type.startsWith('share/session/')
    }

    return false
}

function reduceSessionAction(newState, action) {
    const { steps } = newState

    let progress
    switch (action.type) {
        case InternalActions.START:
            newState['status'] = ShareStatus.PROGRESS_UPDATED
            progress = buildNewProgress(steps, 0)
            break
        case InternalActions.GO_FORWARD:
            newState['status'] = ShareStatus.PROGRESS_UPDATED
            progress = buildNewProgress(steps, newState.progress.index + 1)
            break
        case InternalActions.GO_BACK:
            newState['status'] = ShareStatus.PROGRESS_UPDATED
            progress = buildNewProgress(steps, newState.progress.index - 1)
            break
        case InternalActions.RESET:
            newState['status'] = ShareStatus.READY
            progress = buildNewProgress(steps, 0)
    }

    newState['progress'] = progress
    return newState
}


function buildNewProgress(steps, index) {
    return {
        step: steps[index],
        index,
        canGoBack: index > 0,
        canGoForward: index < steps.length - 1
    }
}

function reduceStatusAction(newState, action) {
    newState['status'] = action.type

    switch (action.type) {
        case ShareStatus.READY:
            newState['steps'] = action.payload
            break
        case ShareStatus.PROGRESS_UPDATED:
            newState['progress'] = action.payload
            break
        case ShareStatus.ERROR:
            newState['error'] = action.payload
            break
    }

    return newState
}

class ShareStatus {
    static NOT_READY = 'share/not_ready'
    static GETTING_STEPS = 'share/getting_steps'
    static READY = 'share/ready'

    static PROGRESS_UPDATED = 'share/progress_updated'

    static ERROR = 'share/error'
}

class ShareActions {
    static fetch = () => dispatch => {
        dispatch(InternalActions.getting())

        getSteps()
            .then(steps => dispatch(InternalActions.ready(steps)))
            .catch(error => dispatch(InternalActions.error(error)))
    }

    static start = () => actionCreator(InternalActions.START)

    static goForward = () => actionCreator(InternalActions.GO_FORWARD)

    static goBack = () => actionCreator(InternalActions.GO_BACK)

    static resetProgress = () => actionCreator(InternalActions.RESET)
}

class InternalActions {
    static START = 'share/session/start'
    static GO_FORWARD = 'share/session/forward'
    static GO_BACK = 'share/session/back'
    static RESET = 'share/session/reset'

    static getting = () => actionCreator(ShareStatus.GETTING_STEPS)
    static ready = steps => actionCreator(ShareStatus.READY, steps)

    static progressUpdated = newProgress => actionCreator(ShareStatus.PROGRESS_UPDATED, newProgress)
}

export { shareReducer, ShareStatus, ShareActions }