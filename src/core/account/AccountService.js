import { getDocAndRefs, isEmptyOrNonExistentDoc } from '../util/DocManagement'

const COLLECTION_NAME = 'users'

async function createUnassociatedAccount(uid, account) {
    const { doc, docRef } = await getDocAndRefs(COLLECTION_NAME, uid)

    if (isEmptyOrNonExistentDoc(doc)) {
        await docRef.set({ account })
    } else {
        await docRef.update({ account })
    }

    return account
}

async function getAccount(uid) {
    const { doc } = await getDocAndRefs(COLLECTION_NAME, uid)

    console.log('Get user:')
    console.log(doc)

    if (isEmptyOrNonExistentDoc(doc)) {
        return null
    }

    return doc.data().account
}

async function updateAccount(uid, account) {
    const { docRef } = await getDocAndRefs(COLLECTION_NAME, uid)

    await docRef.update({ account })

    return account
}

async function deleteAccount(uid) {
    const { docRef } = await getDocAndRefs(COLLECTION_NAME, uid)

    await docRef.delete()
}

export default {
    createUnassociatedAccount: createUnassociatedAccount,
    getAccount: getAccount,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount
}