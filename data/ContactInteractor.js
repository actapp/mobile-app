import firebase from 'react-native-firebase';
import store from 'react-native-simple-store';

let _ref = null
function ref(userId) {
    if (_ref == null) {
        _ref = firebase.firestore().collection('users').doc(userId)
    }

    return _ref
}

export async function listenForUpdates(userId, callback) {
    const docRef = ref(userId)
    docRef.onSnapshot((doc) => {
        callback(doc.data().contacts)
    })
}

export async function updateContact(userId, contact) {
    const docRef = ref(userId)

    const doc = await docRef.get()
    if (!doc.exists || doc.data().contacts == null) {
        docRef.set({ contacts: [contact] })
        return [contact]
    }

    const contacts = doc.data().contacts
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id == contact.id) {
            contacts[i] = contact
        }
    }

    await docRef.set({ contacts: contacts })

    return keyContacts(contacts)
}

export async function addContact(userId, contact) {
    const docRef = ref(userId)

    const doc = await docRef.get()

    if (!doc.exists || doc.data().contacts == null) {
        docRef.set({ contacts: [contact] })
        return keyContacts([contact])
    }

    const contacts = doc.data().contacts

    contacts.push(contact)

    docRef.set({ contacts: contacts })

    console.log("Updated doc: " + JSON.stringify(doc.data()))

    return keyContacts(contacts)
}

export async function getContacts(userId) {
    const docRef = ref(userId)

    const doc = await docRef.get()

    const createdContacts = await createContactsIfNotCreated(doc, docRef)

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
    for (let i = 0; i < contacts.length; i++) {
        keyedContacts.push({ ...contacts[i], key: contacts[i].id })
    }

    return keyedContacts
}

async function createContactsIfNotCreated(doc, docRef) {
    if (!doc.exists || doc.data().contacts == null) {
        await docRef.set({ contacts: [] })
        console.log("Created contacts")
        return []
    }

    return null
}