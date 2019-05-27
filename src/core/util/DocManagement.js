import { firebase } from '../../AppDI'

/**
 * Utility method
 * @param {Name of the collection being referenced} collectionName 
 */
export function getCollectionRef(collectionName) {
    return firebase.firestore().collection(collectionName)
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


// TODO - this should be  refactored below here
import { getSteps } from '../share/ShareInteractor'

const STRUCTURE_VERSION = 1

let _ref = null
function ref(userId) {
    if (_ref == null) {
        _ref = firebase.firestore().collection('users').doc(userId)
    }

    return _ref
}

export default async function getDoc(userId) {
    const docRef = ref(userId)
    const doc = await docRef.get()
    const docData = await verifyStructure(doc)

    if (doc.data() !== docData) {
        await docRef.set(docData)
    }

    return { doc: doc, ref: docRef }
}

async function verifyStructure(doc) {
    const data = doc.data()
    if (!doc.exists || !data) {
        return null
    }

    let docVersion = doc.data().version

    if (docVersion == null) {
        // first version w/o 
        docVersion = 0
    }

    // TODO
    // switch (docVersion) {
    //     case 0:
    //         return await migrateV0(data)
    //     case STRUCTURE_VERSION:
    //         return data
    //     default:
    //         throw new Error('Unknown document version: ' + docVersion)
    // }

    return data
}

async function migrateV0(docData) {
    const contacts = docData.contacts

    if (!contacts || !contacts.length) {
        return { ...docData, version: 1 }
    }

    const newDocData = await migrateContactsV0(contacts)

    newDocData['version'] = STRUCTURE_VERSION

    return newDocData
}

async function migrateContactsV0(contacts) {
    const steps = await getSteps()

    return contacts.map((element) => {
        const newContact = { ...element }
        const { currentStep } = element

        const stepIndex = steps.findIndex(step => {
            step.key == currentStep
        })

        newContact['currentStepIndex'] = stepIndex
        delete newContact.currentStep

        return newContact
    })
}