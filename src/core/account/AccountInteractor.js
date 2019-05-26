import AccountService from './AccountService'
import validateMinistryId from '../ministry/MinistryIdValidator'

export const Roles = {
    SHARER: 'SHARER',
    LEADER: 'LEADER'
}

export async function createAccount(uid, role) {
    return await AccountService.createAccount(uid, createNewAccountModel(role))
}

export async function createAccountWithMinistryId(uid, role, mid) {
    const newAccount = { ...createNewAccountModel(role), ministryId: mid }
    return await AccountService.createAccount(uid, newAccount)
}

export async function getAccount(uid) {
    return await AccountService.getAccount(uid)
}

export async function updateAccount(uid, account) {
    return await AccountService.updateAccount(uid, account)
}

export async function associateAccount(uid, ministryId) {
    validateMinistryId(ministryId)

    const existingAccount = await getAccount(uid)

    if (existingAccount == null) {
        throw new Error('Account does not exist')
    }

    return await updateAccount(uid, { ...existingAccount, ministryId: ministryId })
}

export async function deleteAccount(uid) {
    return await AccountService.deleteAccount(uid)
}

function createNewAccountModel(role) {
    return {
        role: role,
        ministryId: null,
        data: {}
    }
}