import AccountService from './AccountService'

export const Roles = {
    SHARER: 'SHARER',
    LEADER: 'LEADER'
}

export async function createAccount(uid, role) {
    return await AccountService.createAccount(uid, createNewAccountModel(role, ministryId))
}

export async function getAccount(uid) {
    return await AccountService.getAccount(uid)
}

export async function updateAccount(uid, account) {
    return await AccountService.updateAccount(uid, account)
}

function createNewAccountModel(role) {
    return {
        role: role,
        ministryId: null,
        data: {}
    }
}