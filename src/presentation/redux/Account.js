import { createAccount, getAccount, updateAccount } from '../../core/account/AccountInteractor'

import { actionCreator } from './util/Util'

function accountReducer(state = {
    status: AccountStatus.NOT_READY,
    data: null,
    error: null
}, action) {
    if (!isAccountAction(action)) {
        return state
    }

    const newState = { ...state, status: action.type, error: null }

    if (AccountStatus.isAccountAvailable(action.type)) {
        // Action meaning the account is now available for use (created, fetched, updated)
        newState['data'] = action.payload
    } else if (action.type == AccountStatus.ERROR) {
        newState['error'] = action.payload
    }

    return newState
}

function isAccountAction(action) {
    if (action && action.type) {
        return action.type.startsWith('account/')
    }

    return false
}

class AccountStatus {
    static NOT_READY = 'account/not_ready'
    static CREATING = 'account/creating'
    static GETTING = 'account/getting'
    static UPDATING = 'account/updating'

    static CREATED = 'account/created'
    static UPDATED = 'account/updated'

    static READY = 'account/ready'

    static ERROR = 'account/error'

    static isAccountAvailable = (status) => {
        return status == AccountStatus.CREATED
            || status == AccountStatus.UPDATED
            || status == AccountStatus.READY
    }
}

class AccountActions {
    static createAccount = (uid) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.creating())

            createAccount(uid)
                .then(createdAccount => {
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

    static error = (error) => actionCreator(AccountStatus.ERROR, error)
}

export { AccountStatus, AccountActions, accountReducer }