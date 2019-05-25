import { createAccount, getAccount, updateAccount } from '../../core/account/AccountInteractor'

import { actionCreator } from './util/Util'

function accountReducer(state = {
    status: AccountStatus.NOT_READY,

    /**
     * What role the user chooses on first start.
     * 
     * This will change if the user already has an account with a different role.
     * 
     * This is useful in the first start flow for when a new account is being created
     */
    intendedRole: null,

    data: null,
    error: null
}, action) {
    if (!isAccountAction(action)) {
        return state
    }

    // Always clear error after it has been dispatched
    const newState = { ...state, error: null }

    if (!isAccountStatusAction(action)) {
        return reduceNonStatusAction(newState, action)
    } else {
        return reduceStatusAction(newState, action)
    }
}

function isAccountAction(action) {
    if (action && action.type) {
        return action.type.startsWith('account/')
    }

    return false
}

function isAccountStatusAction(action) {
    if (action && action.type) {
        return action.type.startsWith('account/status/')
    }

    return false
}

function reduceNonStatusAction(newState, action) {
    switch (action.type) {
        case ActionTypes.ROLE_INTEDED:
            newState['intendedRole'] = action.payload
            break
        case ActionTypes.CLEAR_ROLE_INTENDED:
            newState['intendedRole'] = null
            break
        default:
            break
    }

    return newState
}

function reduceStatusAction(newState, action) {
    switch (action.type) {
        case AccountStatus.CREATED:
        case AccountStatus.UPDATED:
        case AccountStatus.READY:
            newState['data'] = action.payload
            break
        case AccountStatus.ERROR:
            newState['error'] = action.payload
            break
        default:
            break
    }

    return newState
}

class AccountStatus {
    static NOT_READY = 'account/status/not_ready'
    static CREATING = 'account/status/creating'
    static GETTING = 'account/status/getting'
    static UPDATING = 'account/status/updating'

    static CREATED = 'account/status/created'
    static UPDATED = 'account/status/updated'

    static READY = 'account/status/ready'

    static ERROR = 'account/status/error'

    static isAccountAvailable = (status) => {
        return status == AccountStatus.CREATED
            || status == AccountStatus.UPDATED
            || status == AccountStatus.READY
    }
}


class AccountActions {
    static roleIntended = (role) => actionCreator(ActionTypes.ROLE_INTEDED, role)

    static createAccount = (uid, role) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.creating())

            createAccount(uid, role)
                .then(createdAccount => {
                    dispatch(InternalActions.clearRoleIntended())
                    dispatch(InternalActions.created(createdAccount))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static getAccount = (uid) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.getting())

            getAccount(uid)
                .then(account => {
                    dispatch(InternalActions.clearRoleIntended())
                    dispatch(InternalActions.ready(account))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static updateAccount = (uid, account) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.updating())

            updateAccount(uid, account)
                .then(updatedAccount => {
                    dispatch(InternalActions.updated(updatedAccount))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }
}

class InternalActions {
    static creating = () => actionCreator(AccountStatus.CREATING)
    static getting = () => actionCreator(AccountStatus.GETTING)
    static updating = () => actionCreator(AccountStatus.UPDATING)

    static created = (newAccount) => actionCreator(AccountStatus.CREATED, newAccount)
    static updated = (updatedAccount) => actionCreator(AccountStatus.UPDATED, updatedAccount)
    static ready = (account) => actionCreator(AccountStatus.READY, account)

    static clearRoleIntended = () => actionCreator(ActionTypes.CLEAR_ROLE_INTENDED)

    static error = (error) => actionCreator(AccountStatus.ERROR, error)
}

class ActionTypes {
    static ROLE_INTEDED = 'account/role_intended'
    static CLEAR_ROLE_INTENDED = 'account/clear_role_intended'
}

export { AccountStatus, AccountActions, accountReducer }