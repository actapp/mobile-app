import handleError, { UNKNOWN_STATE_ERROR } from '../../../utils/GlobalErrorHandler'

export default function handleUnknownState(stateDesc, source) {
    handleError(UNKNOWN_STATE_ERROR, new Error('Unknown state: ' + stateDesc), source)
}