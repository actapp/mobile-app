import AccountService from './AccountService'
import validateMinistryId from '../ministry/MinistryIdValidator'

export const Roles = {
    SHARER: 'SHARER',
    LEADER: 'LEADER'
}

export const MINISTRY_NONE = 'MIN_NONE'

export function isAccountDissociated(mid) {
    return mid == MINISTRY_NONE
}

export async function createUnassociatedAccount(uid, role) {
    return await AccountService.createUnassociatedAccount(uid, createNewAccountModel(uid, role))
}

export async function createAccountWithMinistryId(uid, role, mid) {
    const newAccount = { ...createNewAccountModel(role), ministryId: mid }
    return await AccountService.createUnassociatedAccount(uid, newAccount)
}

export async function getAccount(uid) {
    return await AccountService.getAccount(uid)
}

export async function updateAccount(uid, account) {
    return await AccountService.updateAccount(uid, account)
}

/**
 * Tie this user/account to a specific ministry ID
 */
export async function associateAccount(uid, ministryId) {
    validateMinistryId(ministryId)

    const existingAccount = await getAccount(uid)

    if (existingAccount == null) {
        throw new Error('Account does not exist')
    }

    return await updateAccount(uid, { ...existingAccount, ministryId: ministryId })
}

/**
 * Designate this user/account to not be associated to any ministry
 */
export async function dissociateAccount(uid) {
    const existingAccount = await getAccount(uid)

    if (!existingAccount) {
        throw new Error('Account does not exist')
    }

    return await updateAccount(uid, { ...existingAccount, ministryId: MINISTRY_NONE })
}

export async function deleteAccount(uid) {
    return await AccountService.deleteAccount(uid)
}

function createNewAccountModel(uid, role) {
    return {
        id: uid,
        role: role,
        ministryId: null
    }
}