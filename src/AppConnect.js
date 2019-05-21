import { LogInActions } from './presentation/redux/LogIn'
import { ErrorActions } from './presentation/redux/Errors'

export default {
    mapStateToProps: state => ({
        authStatus: state.auth.status,
        authError: state.auth.error
    }),

    mapDispatchToProps: dispatch => ({
        listenForAuthChanges: () => dispatch(LogInActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(LogInActions.stopListeningForAuthChanges()),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    })
}