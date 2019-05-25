import AccountService from './AccountService'

const MINISTRY_ID_LENGTH = 5

export const Roles = {
    SHARER: 'SHARER',
    LEADER: 'LEADER'
}

export async function createAccount(uid, role) {
    return await AccountService.createAccount(uid, createNewAccountModel(role))
}

export async function getAccount(uid) {
    return await AccountService.getAccount(uid)
}

export async function updateAccount(uid, account) {
    return await AccountService.updateAccount(uid, account)
}

export async function deleteAccount(uid) {
    return await AccountService.deleteAccount(uid)
}

export function validateMinistryId(mid) {
    if(!mid || !mid.length || mid.length !== MINISTRY_ID_LENGTH) {
        throw new Error('You did not enter a valid ministry code. Please enter your 5-digit ministry code.')   
    }
}

function createNewAccountModel(role) {
    return {
        role: role,
        ministryId: null,
        data: {}
    }
}