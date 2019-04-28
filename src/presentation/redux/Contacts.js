import { getContacts, addContact, updateContact } from '../../core/contacts/ContactsInteractor'

export default class ContactsRedux {
    static reducer = (state = {
        contactsState: ContactsStates.NOT_READY,
        contacts: null
    }, action) => {
        if (!ContactsRedux.isContactsAction(action)) {
            return state
        }

        switch (action.type) {
            case ActionTypes.LOADING_CONTACTS:
                return { ...state, contactsState: ContactsStates.LOADING }
            case ActionTypes.CONTACTS_UPDATED:
                return { ...state, contactsState: ContactsStates.READY, contacts: action.payload }
            default:
                if (ActionTypes.isError(action.type)) {
                    return { ...state, contactsState: ContactsStates.ERROR, error: action.payload }
                } else {
                    return state
                }
        }
    }

    static isContactsAction = (action) => {
        return action.type.startsWith(ActionTypes.CONTACTS_PREFIX)
    }
}

export class ContactsActions {
    static refreshContacts = (userId) => {
        return function (dispatch) {
            dispatch(ContactsActions.gettingContacts())

            const getContactsTimeout = setTimeout(() => {
                dispatch(ContactsActions.getContactsError(new Error('Timeout')))
            }, 10000)

            getContacts(userId)
                .then(contacts => {
                    clearTimeout(getContactsTimeout)
                    dispatch(ContactsActions.contactsUpdated(contacts))
                })
                .catch(error => {
                    clearTimeout(getContactsTimeout)
                    dispatch(ContactsActions.getContactsError(error))
                })
        }
    }

    static gettingContacts = () => ({
        type: ActionTypes.LOADING_CONTACTS
    })

    static addContact = (name, phone, userId) => {
        return async function (dispatch, getState) {
            return addContact(name, phone, userId)
                .then(updatedContacts => {
                    dispatch(ContactsActions.contactsUpdated(updatedContacts))

                    return updatedContacts.find(element => {
                        return element.phone == phone
                    })
                })
                .catch(error => {
                    throw error
                })
        }
    }

    static addingContact = () => ({
        type: ActionTypes.LOADING_CONTACTS
    })

    static updateContact = (contact, uid) => {
        return async function (dispatch) {
            return updateContact(contact, uid)
                .then((updatedContacts) => {
                    dispatch(ContactsActions.contactsUpdated(updatedContacts))
                })
                .catch(error => {
                    throw error
                })
        }
    }

    static updatingContact = () => ({
        type: ActionTypes.LOADING_CONTACTS
    })

    static contactsUpdated = (contacts) => {
        return {
            type: ActionTypes.CONTACTS_UPDATED,
            payload: contacts
        }
    }

    static getContactsError = error => ({
        type: ActionTypes.GET_CONTACTS_ERROR,
        payload: error
    })

    static addContactsError = error => ({
        type: ActionTypes.ADD_CONTACT_ERROR,
        payload: error
    })

    static updateContactError = error => ({
        type: ActionTypes.UPDATE_CONTACT_ERROR,
        payload: error
    })
}

export class ContactsStates {
    static LOADING = 'loading'
    static NOT_READY = 'not_ready'
    static READY = 'ready'
    static ERROR = 'error'
}

class ActionTypes {
    static CONTACTS_PREFIX = 'contacts/'

    static LOADING_CONTACTS = ActionTypes.create('loading')
    static CONTACT_ADDED = ActionTypes.create('contact_added')
    static CONTACTS_UPDATED = ActionTypes.create('contacts_updated')

    static GET_CONTACTS_ERROR = ActionTypes.create('get_contacts_error')
    static UPDATE_CONTACT_ERROR = ActionTypes.create('update_contacts_error')
    static ADD_CONTACT_ERROR = ActionTypes.create('add_contact_error')

    static create(baseType) {
        return ActionTypes.CONTACTS_PREFIX + baseType
    }

    static isError = (type) => {
        switch (type) {
            case ActionTypes.UPDATE_CONTACT_ERROR:
            case ActionTypes.GET_CONTACTS_ERROR:
            case ActionTypes.ADD_CONTACT_ERROR:
                return true
            default:
                return false
        }
    }
}