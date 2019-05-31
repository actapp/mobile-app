import { connect } from 'react-redux'
import { StatsActions } from '../../redux/Stats';
import { ContactsActions } from '../../redux/Contacts2';

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    account: state.account,
    ministry: state.ministry,
    stats: state.stats,
    contacts: state.contacts
})

const mapDispatchToProps = dispatch => ({
    fetchStats: (uid, mid, role) => dispatch(StatsActions.fetch(uid, mid, role)),
    fetchContacts: uid => dispatch(ContactsActions.fetch(uid))
})