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

        console.log(ministryDoc)

        if (isEmptyOrNonExistentDoc(ministryDoc.doc)) {
            console.log('Returning null')
            return null
        }

        console.log('Returning...')
        console.log(ministryDoc.doc.data())
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

        console.log(snapshot)

        const existingMinistryIds = snapshot.docs.map(doc => doc.data().id)

        console.log(existingMinistryIds)

        return existingMinistryIds
    }
}

function isEmptyOrNonExistentDoc(docSnapshot) {
    return !(docSnapshot != null
        && docSnapshot.exists
        && docSnapshot.data() != null
        && Object.keys(docSnapshot.data()).length > 0)
}