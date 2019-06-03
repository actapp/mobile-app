import ContactsService from './ContactsService'
import StepsService from '../share/StepsService'
import uuidv4 from '../../utils/UUID'

export async function getContacts(userId) {
    let contacts = await ContactsService.getContacts(userId)

    if (!contacts || !contacts.length) {
        // no contacts
        await ContactsService.setContacts([], userId)
        contacts = []
    }

    return contacts
}

export async function addContact(uid, name, phone) {
    console.log('Adding contact:')
    console.log(uid)
    console.log(name)
    console.log(phone)

    validateNameAndNumber(name, phone)

    console.log('Number validated')

    const steps = await StepsService.getSteps()

    const newContact = createNewContact(name, phone, 0, steps[0].desc)

    console.log('Created new contact')
    console.log(newContact)

    return await ContactsService.addContact(newContact, uid)
}

export async function updateContact(uid, contact) {
    return await ContactsService.updateContact(contact, uid)
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