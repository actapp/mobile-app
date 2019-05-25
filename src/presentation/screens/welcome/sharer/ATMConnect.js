import { connect } from 'react-redux'
import { AccountActions } from '../../../redux/Account'

export default ATMConnect = {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    uid: state.auth.user.uid,
    accountStatus: state.account.status,
    accountData: state.account.data,
    error: state.account.error
})

const mapDispatchToProps = dispatch => ({
    associateAccount: (uid, ministryId) => dispatch(AccountActions.associateAccount(uid, ministryId))
})