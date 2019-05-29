import { connect } from 'react-redux'
import { StatsActions } from '../../redux/Stats';

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    account: state.account,
    ministry: state.ministry,
    stats: state.stats
})

const mapDispatchToProps = dispatch => ({
    fetchStats: (uid, mid, role) => dispatch(StatsActions.fetch(uid, mid, role))
})