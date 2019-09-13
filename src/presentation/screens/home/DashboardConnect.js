import { connect } from 'react-redux'
import { AuthActions } from '../../redux/Auth'

const mapStateToProps = state => ({
    ministry: state.ministry
})

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(AuthActions.logOut()),
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}