import { connect } from 'react-redux'

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({
    account: state.account,
    ministry: state.ministry
})

const mapDispatchToProps = dispatch => ({

})