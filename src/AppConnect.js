import { AuthActions } from './presentation/redux/Auth'
import { ErrorActions } from './presentation/redux/Errors'
import { AccountActions } from './presentation/redux/Account';

export default {
    mapStateToProps: state => ({
        authStatus: state.auth.status,
        authError: state.auth.error,
        user: state.auth.user,
        accountStatus: state.account.status,
        accountData: state.account.data
    }),

    mapDispatchToProps: dispatch => ({
        listenForAuthChanges: () => dispatch(AuthActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(AuthActions.stopListeningForAuthChanges()),
        fetchAccount: (uid) => dispatch(AccountActions.getAccount(uid)),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    })
}