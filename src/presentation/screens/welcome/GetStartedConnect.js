import { connect } from 'react-redux'
import { AccountActions } from '../../redux/Account';

export default {
    connect: component => connect({}, mapDispatchToProps)(component)
}

const mapDispatchToProps = dispatch => ({
    roleIntended: (intendedRole) => dispatch(AccountActions.roleIntended(intendedRole))
})