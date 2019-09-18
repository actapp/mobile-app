import { firestore } from '../../AppDI'

/**
 * Utility method
 * @param {Name of the collection being referenced} collectionName 
 */
export function getCollectionRef(collectionName) {
    return firestore().collection(collectionName)
}

/**
 * Given a collection name and a document name, returns an object containing the corresponding collection ref, doc ref, and the document snapshot
 * 
 * @param {Name of the collection this doc belongs to} collectionName 
 * @param {Name of the document being obtained} docName 
 */
export async function getDocAndRefs(collectionName, docName) {
    const collectionRef = getCollectionRef(collectionName)
    const docRef = collectionRef.doc(docName)
    const doc = await docRef.get()
    return { collectionRef, docRef, doc }
}

/**
 * Given a doc snapshot, returns whether it has data
 */
export function isEmptyOrNonExistentDoc(docSnapshot) {
    return !(docSnapshot != null
        && docSnapshot.exists
        && docSnapshot.data() != null
        && Object.keys(docSnapshot.data()).length > 0)
}