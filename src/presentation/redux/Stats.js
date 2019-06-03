import * as StatsInteractor from '../../core/stats/StatsInteractor'

import { actionCreator } from './util/Util'

function statsReducer(state = {
    status: StatsStatus.NOT_READY,
    data: null,
    error: null
}, action) {
    if (!isStatsAction(action)) {
        return state
    }

    const newState = { ...state, status: action.type, error: null }

    switch (action.type) {
        case StatsStatus.READY:
            return { ...newState, data: action.payload }
        case StatsStatus.ERROR:
            return { ...newState, error: action.payload }
        default:
            return newState
    }
}

function isStatsAction(action) {
    if (action && action.type) {
        return action.type.startsWith('stats/')
    }

    return false
}

class StatsStatus {
    static NOT_READY = 'stats/not_ready'
    static GETTING = 'stats/getting'
    static READY = 'stats/ready'

    static ERROR = 'stats/error'
}

class StatsActions {
    static fetch = (uid, mid) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.getting())

            StatsInteractor.getStats(uid, mid)
                .then(stats => dispatch(InternalActions.ready(stats)))
                .catch(error => dispatch(InternalActions.error(error)))
        }
    }

    static incrementConvos = (uid, mid) => dispatch => {
        StatsInteractor.incrementConvos(uid, mid)
            .then(newStats => dispatch(InternalActions.ready(newStats)))
            .catch(error => dispatch(InternalActions.error(error)))
    }

    static incrementConversions = (uid, mid) => dispatch => {
        StatsInteractor.incrementConversions(uid, mid)
            .then(newStats => dispatch(InternalActions.ready(newStats)))
            .catch(error => dispatch(InternalActions.error(error)))
    }
}

class InternalActions {
    static getting = () => actionCreator(StatsStatus.GETTING)
    static ready = stats => actionCreator(StatsStatus.READY, stats)

    static error = error => actionCreator(StatsStatus.ERROR, error)
}

export { statsReducer, StatsStatus, StatsActions }