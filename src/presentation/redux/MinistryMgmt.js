import { setMinistryId, getMinistryId, isAdmin, getCharts } from '../../core/ministry/MinistryInteractor'
import handleError, { GET_MINISTRY_STATUS_ERROR, CHECK_ADMIN_ERROR } from '../../utils/GlobalErrorHandler'

export default class MinistryMgmtRedux {
    static reducer = (state = {
        ministryState: MinistryMgmtStates.NOT_READY,
        ministryId: null,
        isAdmin: false,
        charts: []
    }, action) => {
        if (action.type == Actions.MINISTRY_STATUS_UPDATED) {
            return {
                ...state,
                ministryState: action.payload.ministryState,
                ministryId: action.payload.ministryId,
                isAdmin: action.payload.isAdmin,
                charts: action.payload.charts
            }
        } else if (action.type == Actions.UPDATING_MINISTRY_STATUS) {
            return {
                ...state,
                ministryState: action.payload
            }
        }

        return state
    }
}

export class MinistryMgmtStates {
    static NOT_READY = 'not_ready'
    static REFRESHING = 'refreshing'
    static READY = 'ready'
}

export class MinistryMgmtActions {
    static setMinistryId = (user, mid) => {
        return async function (dispatch) {
            dispatch(Actions.updatingMinistryStatus())

            try {
                await setMinistryId(user.uid, mid)

                // Success, refresh entire ministry status
                await dispatch(MinistryMgmtActions.refreshMinistryStatusWithCallback(user))
            } catch (error) {
                // throw downstream to component for UI
                throw error
            }
        }
    }

    static refreshMinistryStatus = (user) => {
        return function (dispatch) {
            console.log('Getting ministry ID')
            dispatch(Actions.updatingMinistryStatus())

            getMinistryId(user.uid)
                .then(mid => {
                    if (!mid || !mid.length) {
                        // No associated ministry
                        dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, '', false, []))
                        return
                    }

                    console.log(user)
                    isAdmin(user.phoneNumber, mid)
                        .then(isAdminUser => {
                            if (!isAdminUser) {
                                dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, mid, false, []))
                                return
                            }

                            getCharts(user.phoneNumber, mid)
                                .then(charts => {
                                    dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, mid, isAdminUser, charts))
                                })
                        })
                })
                .catch(error => {
                    handleError(GET_MINISTRY_STATUS_ERROR, error, {
                        user: user.uid
                    })
                })
        }
    }

    static refreshMinistryStatusWithCallback = (user) => {
        return async function (dispatch) {
            dispatch(Actions.updatingMinistryStatus())

            console.log('Getting ministry ID')

            const ministryId = await getMinistryId(user.uid)

            console.log('Ministry id: ' + ministryId)
            if (!ministryId || !ministryId.length) {
                // No associated ministry
                dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, '', false, []))
                return
            }

            const isAdminUser = await isAdmin(user.phoneNumber, ministryId)

            if (!isAdminUser) {
                dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, ministryId, false, []))
                return
            }

            const charts = await getCharts(user.phoneNumber, ministryId)

            dispatch(Actions.ministryStatusUpdated(MinistryMgmtStates.READY, ministryId, isAdminUser, charts))
        }
    }
}

class Actions {
    static MINISTRY_STATUS_UPDATED = 'ministry/updated'
    static UPDATING_MINISTRY_STATUS = 'ministry/updating'

    static updatingMinistryStatus = () => ({
        type: Actions.UPDATING_MINISTRY_STATUS,
        payload: MinistryMgmtStates.REFRESHING
    })

    static ministryStatusUpdated = (ministryState, ministryId, isAdminUser, charts) => ({
        type: Actions.MINISTRY_STATUS_UPDATED,
        payload: {
            ministryState: ministryState,
            ministryId: ministryId,
            isAdmin: isAdminUser,
            charts: charts
        }
    })
}