import { connect } from 'react-redux'

import { ShareActions } from '../../redux/Share2'

const mapStateToProps = state => ({
    status: state.share.status,
    progress: state.share.progress,
    error: state.share.error
})

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(ShareActions.fetch()),
    start: () => dispatch(ShareActions.start()),
    goForward: () => dispatch(ShareActions.goForward()),
    goBack: () => dispatch(ShareActions.goBack()),
    reset: () => dispatch(ShareActions.resetProgress())
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}