import { connect } from 'react-redux'

const mapStateToProps = state => ({
    ministry: state.ministry
})

const mapDispatchToProps = dispatch => ({
    
})

export default {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}