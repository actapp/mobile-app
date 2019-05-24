import { AuthActions } from './presentation/redux/Auth'
import { ErrorActions } from './presentation/redux/Errors'

export default {
    mapStateToProps: state => ({
        authStatus: state.auth.status,
        authError: state.auth.error
    }),

    mapDispatchToProps: dispatch => ({
        listenForAuthChanges: () => dispatch(AuthActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(AuthActions.stopListeningForAuthChanges()),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    })
}