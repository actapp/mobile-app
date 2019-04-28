import firebase from 'react-native-firebase'

import uuidv4 from '../utils/UUID'

let _ref = null
function ref(userId) {
    if (_ref == null) {
        _ref = firebase.firestore().collection('users').doc(userId)
    }

    return _ref
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

export async function addContact(name, phone, userId) {
    validateNameAndNumber(name, phone)

    const docRef = ref(userId)

    const doc = await docRef.get()

    console.log("Got doc: " + JSON.stringify(doc.data()))

    const contact = createNewContact(name, phone)
    if (!doc.exists || doc.data().contacts == null) {
        await docRef.set({ contacts: [contact] })
        return keyContacts([contact])
    }

    const contacts = doc.data().contacts

    const existingContact = contacts.find(element => {
        return element.phone == phone
    })

    if (existingContact != null) {
        throw new Error('Contact with number ' + phone + ' already exists!')
    }

    contacts.push(contact)

    await docRef.set({ contacts: contacts })

    console.log("Updated doc: " + JSON.stringify(doc.data()))

    return keyContacts(contacts)
}

export async function updateContact(contact, userId) {
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

function keyContacts(contacts) {
    const keyedContacts = []
    for (let i = 0; i < contacts.length; i++) {
        keyedContacts.push({ ...contacts[i], key: contacts[i].id })
    }

    return keyedContacts
}

function createNewContact(name, phone) {
    return {
        name: name,
        phone: phone,
        id: uuidv4(),
        currentStepIndex: 0
    }
}

async function createContactsIfNotCreated(doc, docRef) {
    if (!doc.exists || doc.data().contacts == null) {
        await docRef.set({ contacts: [] })
        console.log("Created contacts")
        return []
    }

    return null
}

function validateNameAndNumber(name, phone) {
    // super basic validation

    const nameValid = (name && name.length)

    if (!nameValid) {
        throw new Error('Please enter a name')
    }

    // Phone is not empty and only contains 10 numbers
    const phoneValid = (phone && phone.length == 10) && phone.match(/^[0-9]+$/) != null;

    if (!phoneValid) {
        throw new Error('Please enter a valid, 10-digit phone number.')
    }
}