import { AuthActions } from '../../redux/Auth'
import { AccountActions } from '../../redux/Account';
import { MinistryActions } from '../../redux/Ministry';

export default LogInConnect = {
    mapStateToProps: state => ({
        auth: {
            status: state.auth.status,
            user: state.auth.user,
            error: state.auth.error
        },
        account: {
            status: state.account.status,
            intendedRole: state.account.intendedRole,
            data: state.account.data,
            error: state.account.error
        },
        ministry: {
            status: state.ministry.status,
            error: state.ministry.error
        }
    }),

    mapDispatchToProps: dispatch => ({
        startPhoneLogIn: (mdn) => dispatch(AuthActions.startPhoneLogIn(mdn)),
        verifyCode: (code) => dispatch(AuthActions.verifyCode(code)),

        createAccount: (uid, role) => dispatch(AccountActions.createAccount(uid, role)),
        fetchAccount: (uid) => dispatch(AccountActions.getAccount(uid)),

        fetchMinistry: mid => dispatch(MinistryActions.fetch(mid))
    })
}