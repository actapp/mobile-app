import { connect } from 'react-redux'
import { MinistryActions } from '../../../redux/Ministry'
import { AccountActions } from '../../../redux/Account'

export default CMConnect = {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    uid: state.auth.user.uid,

    ministryStatus: state.ministry.status,
    ministryData: state.ministry.data,
    ministryError: state.ministry.error,

    accountStatus: state.account.status,
    accountData: state.account.data,
    accountError: state.account.error
})

const mapDispatchToProps = dispatch => ({
    createMinistry: (name) => dispatch((MinistryActions.create(name))),
    associateAccount: (uid, ministryId) => dispatch(AccountActions.associateAccount(uid, ministryId))
})
