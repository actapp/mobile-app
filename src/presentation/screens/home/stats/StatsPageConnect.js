import { connect } from 'react-redux'
import { StatsActions } from '../../../redux/Stats';

const mapStateToProps = state => ({
    account: state.account,
    ministry: state.ministry,
    stats: state.stats
})

const mapDispatchToProps = dispatch => ({
    fetch: (uid, mid) => dispatch(StatsActions.fetch(uid, mid))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}