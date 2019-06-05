import StatsService from './StatsService'
import { isAccountDissociated } from '../account/AccountInteractor';

/**
 * Get the stats of:
 * - this user
 * - this user's ministry
 * - the global community
 * 
 * If no ministry ID, there will be no ministry stats
 */
export async function getStats(uid, mid) {
    const userStats = await StatsService.getOrCreateAllStatsForUser(uid)


    let minStats = null
    if (!isAccountDissociated(mid)) {
        minStats = await StatsService.getOrCreateAllStatsForMinistry(mid)
    }

    // Global stats should NOT be null
    const globalStats = await StatsService.getAllStatsForGlobal()

    return {
        user: userStats,
        ministry: minStats,
        global: globalStats
    }
}

/**
 * Increment total # of spiritual convos for:
 * - this user
 * - this user's ministry
 * - the global community
 * 
 * If ministry ID is null, ministry will be ignored
 */
export async function incrementConvos(uid, mid) {
    const newUserStats = await StatsService.incrementConvosForUser(uid)

    let newMinStats = null
    if (!isAccountDissociated(mid)) {
        newMinStats = await StatsService.incrementConvosForMinistry(mid)
    }

    const newGlobalStats = await StatsService.incrementConvosForGlobal()

    return {
        user: newUserStats,
        ministry: newMinStats,
        global: newGlobalStats
    }
}

/**
 * Increment total # of conversions for:
 * - this user
 * - this user's ministry
 * - the global community
 * 
 * If ministry ID is null, ministry will be ignored
 */
export async function incrementConversions(uid, mid) {
    const newUserStats = await StatsService.incrementConversionsForUser(uid)

    let newMinStats = null
    if (!isAccountDissociated(mid)) {
        newMinStats = await StatsService.incrementConversionsForMinistry(mid)
    }

    const newGlobalStats = await StatsService.incrementConversionsForGlobal()

    return {
        user: newUserStats,
        ministry: newMinStats,
        global: newGlobalStats
    }
}