import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactNativePlugin } from '@microsoft/applicationinsights-react-native';
import * as AnalyticsConstants from './AnalyticsConstants';

const MS_INSTRUMENTATION_KEY = '684a34e0-82a6-45e2-bf2b-3f394e842956'

const RNPlugin = new ReactNativePlugin();
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: MS_INSTRUMENTATION_KEY
    },
    extensions: [RNPlugin]
});

appInsights.loadAppInsights();

export function trackPage(page) {
    appInsights.trackPageView(
        { name: page }
    )
}

export function trackShareStarted(uid, cid) {
    appInsights.trackEvent({
        name: AnalyticsConstants.EVENT_SHARE_STARTED,
        properties: {
            user: uid,
            contactId: cid
        }
    })
}

export function trackStepCompleted(uid, cid, stepKey) {
    appInsights.trackEvent({
        name: AnalyticsConstants.EVENT_STEP_COMPLETED,
        properties: {
            user: uid,
            [AnalyticsConstants.PARAM_STEP_KEY]: stepKey,
            contactId: cid
        }
    })
}

export function trackSessionCompleted(uid, cid, acceptedChrist) {
    appInsights.trackEvent({
        name: AnalyticsConstants.EVENT_SHARE_COMPLETED,
        properties: {
            user: uid,
            [AnalyticsConstants.PARAM_ACCEPTED_CHRIST]: acceptedChrist,
            contactId: cid
        }
    })
}


// import Analytics from 'appcenter-analytics';
// import * as AnalyticsConstants from './AnalyticsConstants';

// export function trackStepCompleted(uid, cid, stepKey) {
//     Analytics.trackEvent(AnalyticsConstants.EVENT_STEP_COMPLETED, {
//         user: uid,
//         [AnalyticsConstants.PARAM_STEP_KEY]: stepKey,
//         contactId: cid
//     })
// }

// export function trackSessionCompleted(uid, cid, acceptedChrist) {
//     Analytics.trackEvent(AnalyticsConstants.EVENT_SHARE_COMPLETED, {
//         user: uid,
//         [AnalyticsConstants.PARAM_ACCEPTED_CHRIST]: acceptedChrist,
//         contactId: cid
//     })
// }