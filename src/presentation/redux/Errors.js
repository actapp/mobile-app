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
                return { ...state, lastError: action.payload.error, lastErrorSource: action.payload.source }
            default:
                return state
        }
    }
}

export class ErrorActions {
    static TYPE_TIMEOUT = 'error/tiemout'

    static timeout = (source) => ({
        type: ErrorActions.TYPE_TIMEOUT,
        payload: {
            error: new Error('Timeout'),
            source: source
        }
    })
}