import { connect } from 'react-redux'
import { AccountActions } from '../../../redux/Account'

export default ATMConnect = {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    uid: state.auth.user.uid,
    accountStatus: state.account.status,
    account: state.account.data
})

const mapDispatchToProps = dispatch => ({
    updateAccount: (uid, account) => dispatch(AccountActions.updateAccount(uid, account))
})