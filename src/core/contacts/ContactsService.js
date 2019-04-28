import getDoc from '../util/DocManagement'

export default class ContactsService {
    static getContacts = async userId => {
        const { doc } = await getDoc(userId)
        return doc.data().contacts
    }

    static setContacts = async (contacts, userId) => {
        const { doc, ref } = await getDoc(userId)
        await ref.update({ contacts: contacts })
    }

    static addContact = async (contact, userId) => {
        const { doc, ref } = await getDoc(userId)

        if (doc.data().contacts == null) {
            console.log('No contacts exist yet--setting')
            await ref.update({ contacts: [contact] })
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

        await ref.update({ contacts: contacts })

        return contacts
    }

    static updateContact = async (contact, userId) => {
        const { doc, ref } = await getDoc(userId)
    
        if (doc.data().contacts == null) {
            await ref.update({ contacts: [contact] })
            return [contact]
        }

        const contacts = doc.data().contacts
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id == contact.id) {
                contacts[i] = contact
            }
        }

        await ref.update({ contacts: contacts })

        return contacts
    }
}