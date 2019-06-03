import { connect } from 'react-redux'

import { ShareActions } from '../../redux/Share'
import { ContactsActions } from '../../redux/Contacts';
import { StatsActions } from '../../redux/Stats'

const mapStateToProps = state => ({
    user: state.auth.user,
    account: state.account,
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

    updateContact: (uid, contact) => dispatch(ContactsActions.updateContact(uid, contact)),
    incrementConvos: (uid, mid) => dispatch(StatsActions.incrementConvos(uid, mid)),
    incrementConversions: (uid, mid) => dispatch(StatsActions.incrementConversions(uid, mid))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}