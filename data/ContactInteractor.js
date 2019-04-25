import firebase from 'react-native-firebase';
import store from 'react-native-simple-store';

let _ref = null
function ref(userId) {
    if (_ref == null) {
        _ref = firebase.firestore().collection('users').doc(userId)
    }

    return _ref
}

export async function updateContact(userId, contact) {
    const docRef = ref(userId)

    await firebase.firestore()
    .runTransaction(async transaction => {
        
    })
}

export async function addContact(userId, contact) {
    const docRef = ref(userId)
    await firebase
        .firestore()
        .runTransaction(async transaction => {
            const doc = await transaction.get(docRef)
        
            if (!doc.exists || doc.data().contacts == null) {
                transaction.set(docRef, { contacts: [contact] })
                return keyContacts([contact])
            }

            const contacts = doc.data().contacts
            contacts.push(contact)

            transaction.set(docRef, { contacts: contacts })

            console.log("Updated doc: " + JSON.stringify(doc.data()))

            return keyContacts(contacts)
        })
}

export async function getContacts(userId) {
    const docRef = ref(userId)

    const doc = await docRef.get()

    const createdContacts = createContactsIfNotCreated(doc)
    if (createdContacts !== null) {
        return createdContacts
    } else {
        return keyContacts(doc.data().contacts)
    }
}

export async function hasContacts(userId) {
    const contacts = await getContacts(userId)

    console.log("Contacts: " + contacts)

    return contacts != null && contacts.length > 0
}

function keyContacts(contacts) {
    const keyedContacts = []
    for(let i = 0; i < contacts.length; i++) {
        keyedContacts.push({...contacts[i], key: contacts[i].id})
    }

    return keyedContacts
}

function createContactsIfNotCreated(doc) {
    if (!doc.exists || doc.data().contacts == null) {
        firebase.firestore()
            .runTransaction(async transaction => {
                transaction.set(docRef, { contacts: [] })
                console.log("Created contacts")
            })

        return []
    }

    return null
}