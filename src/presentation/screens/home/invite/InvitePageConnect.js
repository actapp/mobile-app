import { connect } from 'react-redux'
import { ContactsActions } from '../../../redux/Contacts2';

const mapStateToProps = state => ({
    ministry: state.ministry
})

const mapDispatchToProps = dispatch => ({
    fetch: uid => dispatch(ContactsActions.fetch(uid))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}