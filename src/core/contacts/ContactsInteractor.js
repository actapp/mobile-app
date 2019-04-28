import ContactsService from './ContactsService'
import StepsService from '../share/StepsService'
import uuidv4 from '../../utils/UUID'

export async function getContacts(userId) {
    let contacts = await ContactsService.getContacts(userId)

    if (!contacts || !contacts.length) {
        // no contacts
        await ContactsService.setContacts([])
        contacts = []
    }

    return keyContacts(contacts)
}

export async function addContact(name, phone, userId) {
    validateNameAndNumber(name, phone)
    const steps = await StepsService.getSteps()
    const newContact = createNewContact(name, phone, 0, steps[0].desc)
    const newContacts = await ContactsService.addContact(newContact, userId)

    return keyContacts(newContacts)
}

export async function updateContact(contact, userId) {
    const newContacts = await ContactsService.updateContact(contact, userId)
    return keyContacts(newContacts)
}

function keyContacts(contacts) {
    const keyedContacts = []
    for (let i = 0; i < contacts.length; i++) {
        keyedContacts.push({ ...contacts[i], key: contacts[i].id })
    }

    return keyedContacts
}

function createNewContact(name, phone, stepIndex, stepDesc) {
    return {
        name: name,
        phone: phone,
        id: uuidv4(),
        currentStepIndex: stepIndex,
        currentStepDesc: stepDesc
    }
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