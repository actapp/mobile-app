import AccountService from './AccountService'

export async function createAccount(uid) {
    return await AccountService.createAccount(uid, createNewAccountModel())
}

export async function getAccount(uid) {
    return await AccountService.getAccount(uid)
}

export async function updateAccount(uid, account) {
    return await AccountService.updateAccount(uid, account)
}

function createNewAccountModel() {
    return {

    }
}