import { getDocAndRefs, isEmptyOrNonExistentDoc } from '../util/DocManagement'

const COLLECTION_NAME = 'users'

async function getUserDocAndRefs(uid) {
    return await getDocAndRefs(COLLECTION_NAME, uid)
}

export default class ContactsService {
    static getContacts = async userId => {
        const { doc } = await getUserDocAndRefs(userId)

        if (isEmptyOrNonExistentDoc(doc)) {
            return null
        }

        return doc.data().contacts
    }

    static setContacts = async (contacts, userId) => {
        const { docRef } = await getUserDocAndRefs(userId)
        await docRef.update({ contacts })
    }

    static addContact = async (contact, userId) => {
        const { doc, docRef } = await getUserDocAndRefs(userId)

        if (isEmptyOrNonExistentDoc(doc) || doc.data().contacts == null) {
            console.log('No contacts exist yet--setting')
            await docRef.update({ contacts: [contact] })
            return [contact]
        }

        const contacts = doc.data().contacts

        const existingContact = contacts.find(element => {
            return element.phone == contact.phone
        })

        if (existingContact != null) {
            throw new Error('Contact with number ' + phone + ' already exists!')
        }

        contacts.push(contact)

        await docRef.update({ contacts })

        return contacts
    }

    static updateContact = async (contact, userId) => {
        const { doc, docRef } = await getUserDocAndRefs(userId)

        if (isEmptyOrNonExistentDoc(doc) || doc.data().contacts == null) {
            await docRef.update({ contacts: [contact] })
            return [contact]
        }

        const contacts = doc.data().contacts
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id == contact.id) {
                contacts[i] = contact
            }
        }

        await docRef.update({ contacts: contacts })

        return contacts
    }
}