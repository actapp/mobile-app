import { AuthActions } from './presentation/redux/Auth'
import { ErrorActions } from './presentation/redux/Errors'
import { AccountActions } from './presentation/redux/Account';
import { MinistryActions } from './presentation/redux/Ministry';

export default {
    mapStateToProps: state => ({
        auth: state.auth,
        
        account: state.account,

        ministry: state.ministry,

        genericError: state.errors.genericError
    }),

    mapDispatchToProps: dispatch => ({
        listenForAuthChanges: () => dispatch(AuthActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(AuthActions.stopListeningForAuthChanges()),
        fetchAccount: (uid) => dispatch(AccountActions.getAccount(uid)),
        fetchMinistry: (mid) => dispatch(MinistryActions.fetch(mid)),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    })
}