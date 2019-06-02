import { connect } from 'react-redux'

import { ContactsActions } from '../../redux/Contacts'

const mapStateToProps = state => ({
    account: state.account,
    contactsStatus: state.contacts.status,
    contactsError: state.contacts.error
})

const mapDispatchToProps = dispatch => ({
    addContact: (uid, name, phone) => dispatch(ContactsActions.addContact(uid, name, phone))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}