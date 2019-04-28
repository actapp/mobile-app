import Analytics from 'appcenter-analytics';
import * as AnalyticsConstants from './AnalyticsConstants';

export function trackStepCompleted(uid, cid, stepKey) {
    Analytics.trackEvent(AnalyticsConstants.EVENT_STEP_COMPLETED, {
        user: uid,
        [AnalyticsConstants.PARAM_STEP_KEY]: stepKey,
        contactId: cid
    })
}

export function trackSessionCompleted(uid, cid, acceptedChrist) {
    Analytics.trackEvent(AnalyticsConstants.EVENT_SHARE_COMPLETED, {
        user: uid,
        [AnalyticsConstants.PARAM_ACCEPTED_CHRIST]: acceptedChrist,
        contactId: cid
    })
}