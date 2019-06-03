import StatsService from './StatsService'

/**
 * Get the stats of:
 * - this user
 * - this user's ministry
 * - the global community
 * 
 * If no ministry ID, there will be no ministry stats
 */
export async function getStats(uid, mid) {
    let userStats = await StatsService.getStatsForUser(uid)
    if(userStats == null) {
        userStats = createDomainSpecificStats()
        await StatsService.updateStatsForUser(uid, userStats)
    }
    
    let ministryStats = null
    if(mid != null) {
        ministryStats = await StatsService.getStatsForMinistry(mid)
        if(ministryStats == null) {
            ministryStats = createDomainSpecificStats()
            await StatsService.updateStatsForMinistry(mid, stats)
        }
    }

    // Global stats should NOT be null
    const globalStats = await StatsService.getStatsForGlobal()

    return {
        user: userStats,
        ministry: ministryStats,
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
export async function incrementConversations(uid, mid) {
    const stats = await getStats(uid, mid)

    const newUserStats = {
        convos: stats.user.convos + 1,
        // conversions: stats.
    }
}

function createDomainSpecificStats() {
    return {
        convos: 0,
        conversions: 0
    }
}