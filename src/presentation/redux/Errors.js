import { logBreadcrumb } from '../../utils/GlobalErrorHandler'

export default class ErrorRedux {
    static breadcrumbMiddleware = ({ getState }) => next => action => {
        const prevState = getState()

        const stateBc = JSON.stringify(prevState)

        const returnedValue = next(action)

        const nextStateBc = JSON.stringify(getState())

        logBreadcrumb('State: ' + stateBc)
        logBreadcrumb('Action: ' + JSON.stringify(action))
        logBreadcrumb('New state: ' + nextStateBc)

        return returnedValue
    }

    static reducer = (state = {}, action) => {
        switch (action.type) {
            case ErrorActions.TYPE_TIMEOUT:
                return { ...state, genericError: action.payload.error, genericErrorSource: action.payload.source }
            default:
                // Clear error after it's dispatched once
                return { ...state, genericError: null, genericErrorSource: null }
        }
    }
}

export class ErrorActions {
    static TYPE_TIMEOUT = 'error/timeout'

    static timeout = (source) => ({
        type: ErrorActions.TYPE_TIMEOUT,
        payload: {
            error: new Error('Operation timed out'),
            source: source
        }
    })
}