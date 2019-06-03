import { createMinistry, getMinistry, updateMinistry } from '../../core/ministry/MinistryInteractor'

import { actionCreator } from './util/Util'

function ministryReducer(state = {
    status: MinistryStatus.NOT_READY,
    data: null,
    error: null
}, action) {
    if (!isMinistryAction(action)) {
        return state
    }

    const newState = { ...state, status: action.type, error: null }

    switch (action.type) {
        case MinistryStatus.CREATED:
        case MinistryStatus.READY:
        case MinistryStatus.UPDATED:
            newState['data'] = action.payload
            break
        case MinistryStatus.ERROR:
            newState['error'] = action.payload
            break
        default:
            break
    }

    return newState
}

function isMinistryAction(action) {
    if (action && action.type) {
        return action.type.startsWith('min/')
    }

    return false
}

class MinistryStatus {
    static NOT_READY = 'min/not_ready'

    static CREATING = 'min/creating'
    static GETTING = 'min/getting'
    static UPDATING = 'min/updating'

    static CREATED = 'min/created'
    static READY = 'min/ready'
    static UPDATED = 'min/updated'

    static ERROR = 'min/error'
}

class MinistryActions {
    static create = (name) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.creating())

            createMinistry(name)
                .then(createdMinistry => {
                    dispatch(InternalActions.created(createdMinistry))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static fetch = (mid) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.getting())

            getMinistry(mid)
                .then(ministry => {
                    dispatch(InternalActions.ready(ministry))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static update = (mid, ministry) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.updating())

            updateMinistry(mid, ministry)
                .then(updatedMinistry => {
                    dispatch(InternalActions.updated(updatedMinistry))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }
}

class InternalActions {
    static creating = () => actionCreator(MinistryStatus.CREATING)
    static created = newMinistry => actionCreator(MinistryStatus.CREATED, newMinistry)

    static getting = () => actionCreator(MinistryStatus.GETTING)
    static ready = ministry => actionCreator(MinistryStatus.READY, ministry)

    static updating = () => actionCreator(MinistryStatus.UPDATING)
    static updated = updatedAccount => actionCreator(MinistryStatus.UPDATED, updatedAccount)

    static error = error => actionCreator(MinistryStatus.ERROR, error)
}

export { ministryReducer, MinistryActions, MinistryStatus }