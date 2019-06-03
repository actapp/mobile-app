import { connect } from 'react-redux'
import { StatsActions } from '../../../redux/Stats';

const mapStateToProps = state => ({
    accountData: state.account.data,
    stats: state.stats
})

const mapDispatchToProps = dispatch => ({
    fetch: accountData => dispatch(StatsActions.fetch(accountData.id, accountData.ministryId, accountData.role))
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}