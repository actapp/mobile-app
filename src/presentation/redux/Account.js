import { createAccount, getAccount, updateAccount, associateAccount, createAccountWithMinistryId } from '../../core/account/AccountInteractor'

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
        case ActionTypes.ROLE_INTENDED:
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
    newState['status'] = action.type

    switch (action.type) {
        case AccountStatus.CREATED:
        case AccountStatus.UPDATED:
        case AccountStatus.ASSOCIATED:
        case AccountStatus.READY:
        case AccountStatus.CREATED_UNASSOCIATED:
        case AccountStatus.READY_UNASSOCIATED:
            newState['data'] = action.payload
            break
        case AccountStatus.NO_ACCOUNT:
            newState['data'] = null
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
    static ASSOCIATING = 'account/status/associating'

    static CREATED = 'account/status/created'
    static CREATED_UNASSOCIATED = 'account/status/created_unassociated'
    static UPDATED = 'account/status/updated'
    static ASSOCIATED = 'account/status/associated'
    static READY = 'account/status/ready'
    static READY_UNASSOCIATED = 'account/status/ready_unassociated'

    static NO_ACCOUNT = 'account/status/none'

    static ERROR = 'account/status/error'
}


class AccountActions {
    static roleIntended = (role) => actionCreator(ActionTypes.ROLE_INTENDED, role)

    static createAccount = (uid, role) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.creating())

            createAccount(uid, role)
                .then(createdAccount => {
                    onAccountCreated(dispatch, createdAccount)
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static createAccountWithMinistryId = (uid, role, mid) => {
        dispatch(InternalActions.creating())

        createAccountWithMinistryId(uid, role, mid)
            .then(createdAccount => {
                onAccountCreated(dispatch, createdAccount)
            })
            .catch(error => {
                dispatch(InternalActions.error(error))
            })
    }

    static getAccount = (uid) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.getting())

            getAccount(uid)
                .then(account => {
                    if (account != null) {
                        // An account w/ this UID exists
                        dispatch(InternalActions.clearRoleIntended())

                        if (isAccountAssociated(account)) {
                            dispatch(InternalActions.ready(account))
                        } else {
                            dispatch(InternalActions.readyUnassociated(account))
                        }
                    } else {
                        // We need to create an account; don't clear intended role yet because it is used in creating account
                        dispatch(InternalActions.noAccount())
                    }
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

    static associateAccount = (uid, ministryId) => {
        return (dispatch, getState) => {
            dispatch(InternalActions.associating())

            associateAccount(uid, ministryId)
                .then(associateAccount => {
                    dispatch(InternalActions.associated(associateAccount))
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
    static associating = () => actionCreator(AccountStatus.ASSOCIATING)

    static created = (newAccount) => actionCreator(AccountStatus.CREATED, newAccount)
    static createdUnassociated = (newAccount) => actionCreator(AccountStatus.CREATED_UNASSOCIATED, newAccount)
    static updated = (updatedAccount) => actionCreator(AccountStatus.UPDATED, updatedAccount)
    static associated = (associatedAccount) => actionCreator(AccountStatus.ASSOCIATED, associatedAccount)
    static ready = (account) => actionCreator(AccountStatus.READY, account)
    static readyUnassociated = (account) => actionCreator(AccountStatus.READY_UNASSOCIATED, account)
    static noAccount = () => actionCreator(AccountStatus.NO_ACCOUNT)

    static clearRoleIntended = () => actionCreator(ActionTypes.CLEAR_ROLE_INTENDED)

    static error = (error) => actionCreator(AccountStatus.ERROR, error)
}

class ActionTypes {
    static ROLE_INTENDED = 'account/role_intended'
    static CLEAR_ROLE_INTENDED = 'account/clear_role_intended'
}

function onAccountCreated(dispatch, createdAccount) {
    dispatch(InternalActions.clearRoleIntended())

    if (isAccountAssociated(createdAccount)) {
        dispatch(InternalActions.created(createdAccount))
    } else {
        dispatch(InternalActions.createdUnassociated(createdAccount))
    }
}

function isAccountAssociated(account) {
    if (!account) {
        return false
    }

    return account.ministryId && account.ministryId.length
}

export { AccountStatus, AccountActions, accountReducer }