import { connect } from 'react-redux'
import { ContactsActions } from '../../../redux/Contacts2';

const mapStateToProps = state => ({
    account: state.account,
    contacts: state.contacts
})

const mapDispatchToProps = dispatch => ({
    fetch: uid => dispatch(ContactsActions.fetch(uid))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}