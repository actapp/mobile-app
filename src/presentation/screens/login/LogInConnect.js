import { AuthActions } from '../../redux/Auth'

export default LogInConnect = {
    mapStateToProps: state => ({
        authStatus: state.auth.status,
        error: state.auth.error
    }),

    mapDispatchToProps: dispatch => ({
        startPhoneLogIn: (mdn) => dispatch(AuthActions.startPhoneLogIn(mdn)),
        verifyCode: (code) => dispatch(AuthActions.verifyCode(code))
    })
}