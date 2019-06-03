import { connect } from 'react-redux'
import { AccountActions } from '../../../redux/Account'
import { MinistryActions } from '../../../redux/Ministry';

export default ATMConnect = {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    uid: state.auth.user.uid,

    accountStatus: state.account.status,
    accountData: state.account.data,
    ministryStatus: state.ministry.status,

    accountError: state.account.error,
    ministryError: state.ministry.error
})

const mapDispatchToProps = dispatch => ({
    associateAccount: (uid, ministryId) => dispatch(AccountActions.associateAccount(uid, ministryId)),
    fetchMinistry: mid => dispatch(MinistryActions.fetch(mid))
})