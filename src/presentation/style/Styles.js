import Colors from './Colors'

const rootContainer = {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  backgroundColor: Colors.rootBackgroundColor,
}

export default Styles = {
    rootContainer: rootContainer,
    centeredRootContainer: {
        ...rootContainer,
        justifyContent: 'center'
    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        color: 'white',
        fontSize: 16
    }
}