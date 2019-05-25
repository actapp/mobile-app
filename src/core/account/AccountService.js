import getDoc from '../util/DocManagement'

async function createAccount(uid, account) {
    const { doc, ref } = await getDoc(uid)

    await ref.update({ account })

    return account
}

async function getAccount(uid) {
    const { doc, ref } = await getDoc(uid)

    if (!doc.exists || doc.data() == null || doc.data().account == null) {
        return null
    }

    return doc.data().account
}

async function updateAccount(uid, account) {
    const { doc, ref } = await getDoc(uid)

    await ref.update({ account })

    return account
}

export default {
    createAccount: createAccount,
    getAccount: getAccount,
    updateAccount: updateAccount
}