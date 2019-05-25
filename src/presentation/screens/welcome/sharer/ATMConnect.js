import { connect } from 'react-redux'

export default ATMConnect = {
    connect: component => connect(mapStateToProps, mapDispatchToProps)(component)
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})