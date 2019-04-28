import { Alert } from 'react-native';
import Platform from '../../utils/Platform'

export function alert(title, msg) {
    Alert.alert(
        title,
        msg
    )
}

export function confirm(title, msg, onYes, onNo, onCancel) {
    Alert.alert(
        title,
        msg,
        confirmationButtons(onYes, onNo, onCancel, onNo),
        { cancelable: false },
    );
}

function confirmationButtons(onYes, onNo, onCancel, destructiveOperation) {
    const buttons = {}
    if (onCancel !== null) {
        buttons['cancel'] = createAlertButton('Cancel', onCancel)
    }

    if (onNo !== null) {
        buttons['no'] = createAlertButton('No', onNo)
    }

    if (onYes !== null) {
        buttons['yes'] = createAlertButton('Yes', onYes)
    }

    return sortButtons(buttons)    
}

function sortButtons(buttonsObject) {
    let buttonsList = null
    if (Platform.isAndroid()) {
        buttonsList = [
            buttonsObject.cancel,
            buttonsObject.no,
            buttonsObject.yes
        ]
    } else {
        if(Platform.isIos()) {
            buttonsObject.no.style = 'destructive'
        }

        buttonsList = [
            buttonsObject.yes,
            buttonsObject.no,
            buttonsObject.cancel
        ]
    }

    return buttonsList.filter(button => button !== null)
}

function determineNegativeStyle(negativeOperation, destructiveOperation) {
    return 'destructive'
    // return negativeOperation == destructiveOperation ? 'destructive' : 'cancel'
}

function createAlertButton(text, onPress) {
    return {
        text: text,
        onPress: onPress
    }
}

export function alertError(msg = 'Uh oh, something went wrong. Please try again later.', title = 'Error') {
    Alert.alert(
        title,
        msg,
        [
            { text: 'OK', onPress: () => { } },
        ],
        { cancelable: true },
    );
}