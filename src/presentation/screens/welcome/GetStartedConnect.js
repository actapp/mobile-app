import { connect } from 'react-redux'
import { AccountActions } from '../../redux/Account';

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    roleIntended: (intendedRole) => dispatch(AccountActions.roleIntended(intendedRole))
})