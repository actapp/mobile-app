import { getDocAndRefs } from '../util/DocManagement'

const USERS_COLLECTION = 'users'
const MINISTRY_COLLECTION = 'ministries'

const GLOBAL_COLLECTION = 'global'
const GLOBAL_DOCUMENT = 'global'

export default class StatsService {
    static getStatsForUser = async uid => {
        const { doc } = await getDocAndRefs(USERS_COLLECTION, uid)
        return doc.data().stats
    }

    static updateStatsForUser =  async (uid, stats) => {
        const { docRef } = await getDocAndRefs(USERS_COLLECTION, uid)
        await docRef.update({ stats })
        return stats
    }

    static getStatsForMinistry = async mid => {
        const { doc } = await getDocAndRefs(MINISTRY_COLLECTION, mid)
        return doc.data().stats
    }

    static updateStatsForMinistry = async (mid, stats) => {
        const { docRef } = await getDocAndRefs(MINISTRY_COLLECTION, uid)
        await docRef.update({ stats })
        return stats
    }

    static getStatsForGlobal = async () => {
        const { doc } = await getDocAndRefs(GLOBAL_COLLECTION, GLOBAL_DOCUMENT)
        return doc.data().stats
    }

    static updateStatsForGlobal = async stats => {
        const { docRef } = await getDocAndRefs(GLOBAL_COLLECTION, GLOBAL_DOCUMENT)
        await docRef.update({ stats })
        return stats
    }
}