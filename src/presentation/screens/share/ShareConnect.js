import { connect } from 'react-redux'

import { ShareActions } from '../../redux/Share'
import { ContactsActions } from '../../redux/Contacts';

const mapStateToProps = state => ({
    user: state.auth.user,
    status: state.share.status,
    progress: state.share.progress,
    error: state.share.error
})

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(ShareActions.fetch()),
    start: contact => dispatch(ShareActions.start(contact)),
    goForward: () => dispatch(ShareActions.goForward()),
    goBack: () => dispatch(ShareActions.goBack()),
    reset: () => dispatch(ShareActions.resetProgress()),

    updateContact: (uid, contact) => dispatch(ContactsActions.updateContact(uid, contact))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}