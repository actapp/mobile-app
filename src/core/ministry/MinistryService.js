import { getCollectionRef, getDocAndRefs } from '../util/DocManagement'

const COLLECTION_NAME = 'ministries'

export default class MinistryService {
    static addMinistry = async ministry => {
        const ministryDoc = await getDocAndRefs(COLLECTION_NAME, ministry.id)
        if (!isEmptyOrNonExistentDoc(ministryDoc)) {
            throw new Error('Ministry with ID ' + ministry.id + ' already exists!')
        }

        await ministryDoc.docRef.set(ministry)

        return ministry
    }

    static getMinistry = async mid => {
        const ministryDoc = await getDocAndRefs(COLLECTION_NAME, mid)

        if (isEmptyOrNonExistentDoc(ministryDoc.doc)) {
            return null
        }

        return ministryDoc.doc.data()
    }

    static updateMinistry = async ministry => {
        const ministryDoc = await getDocAndRefs(COLLECTION_NAME, ministry.id)
        if (isEmptyOrNonExistentDoc(ministryDoc)) {
            await addMinistry(ministry)
        } else {
            ministryDoc.docRef.update(ministry)
        }
    }

    static listMinistryIds = async () => {
        const snapshot = await getCollectionRef(COLLECTION_NAME).get()
        const existingMinistryIds = snapshot.docs.map(doc => doc.id)

        return existingMinistryIds
    }
}

function isEmptyOrNonExistentDoc(docSnapshot) {
    return !(docSnapshot != null
        && docSnapshot.exists
        && docSnapshot.doc.data() != null
        && Object.keys(docSnapshot.doc.data()).length === 0)
}