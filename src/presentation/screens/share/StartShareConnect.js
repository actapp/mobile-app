import { connect } from 'react-redux'

import { ContactsActions } from '../../redux/Contacts'

const mapStateToProps = state => ({
    user: state.auth.user,
    account: state.account,
    contacts: state.contacts
})

const mapDispatchToProps = dispatch => ({
    addContact: (uid, name, phone) => dispatch(ContactsActions.addContact(uid, name, phone))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}