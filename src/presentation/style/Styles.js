import Platform from '../../utils/Platform'
import Colors from './Colors'

const rootContainer = {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: Colors.rootBackgroundColor,
}

export default {
    simpleRootContainer: {
        ...rootContainer,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rootContainer: rootContainer,
    centeredRootContainer: {
        ...rootContainer,
        justifyContent: 'center'
    },
    horizontallyCenteredContentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    centeredContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    bigHeader: {
        color: '#fff',
        fontWeight: '100',
        fontSize: 40,
        fontFamily: sansSerifIfAndroid()
    },
    bigHeaderSubtitle: {
        color: '#fff',
        fontWeight: '200',
        fontSize: 20,
        fontFamily: sansSerifIfAndroid()
    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        color: 'white',
        fontSize: 16
    }
}

function sansSerifIfAndroid() {
    return Platform.isAndroid() ? 'sans-serif-light' : undefined
}