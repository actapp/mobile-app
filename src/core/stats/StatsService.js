import { getDocAndRefs, isEmptyOrNonExistentDoc } from '../util/DocManagement'

const USERS_COLLECTION = 'users'
const MINISTRY_COLLECTION = 'ministries'

const GLOBAL_COLLECTION = 'global'
const GLOBAL_DOCUMENT = 'global'

export default class StatsService {
    static incrementConvosForUser = async uid => {
        const { doc, docRef } = await getDocAndRefs(USERS_COLLECTION, uid)
        const currentStats = await getOrCreateStatsForDoc(doc, docRef)
        currentStats.convos = await incrementFieldValueForDoc(doc, docRef, 'convos')
        return currentStats
    }

    static incrementConversionsForUser = async uid => {
        const { doc, docRef } = await getDocAndRefs(USERS_COLLECTION, uid)
        const currentStats = await getOrCreateStatsForDoc(doc, docRef)
        currentStats.conversions = await incrementFieldValueForDoc(doc, docRef, 'conversions')
        return currentStats
    }

    static getOrCreateAllStatsForUser = async uid => {
        const { doc, docRef } = await getDocAndRefs(USERS_COLLECTION, uid)
        return getOrCreateStatsForDoc(doc, docRef)
    }

    static incrementConvosForMinistry = async mid => {
        const { doc, docRef } = await getDocAndRefs(MINISTRY_COLLECTION, mid)
        const currentStats = await getOrCreateStatsForDoc(doc, docRef)
        currentStats.convos = await incrementFieldValueForDoc(doc, docRef, 'convos')
        return currentStats
    }

    static incrementConversionsForMinistry = async mid => {
        const { doc, docRef } = await getDocAndRefs(MINISTRY_COLLECTION, mid)
        const currentStats = await getOrCreateStatsForDoc(doc, docRef)
        currentStats.conversions = await incrementFieldValueForDoc(doc, docRef, 'conversions')
        return currentStats
    }

    static getOrCreateAllStatsForMinistry = async mid => {
        const { doc, docRef } = await getDocAndRefs(MINISTRY_COLLECTION, mid)
        return getOrCreateStatsForDoc(doc, docRef)
    }

    static incrementConvosForGlobal = async () => {
        const { doc, docRef } = await getDocAndRefs(GLOBAL_COLLECTION, GLOBAL_DOCUMENT)
        const currentStats = await StatsService.getAllStatsForGlobal()
        currentStats.convos = await incrementFieldValueForDoc(doc, docRef, 'convos')
        return currentStats
    }

    static incrementConversionsForGlobal = async () => {
        const { doc, docRef } = await getDocAndRefs(GLOBAL_COLLECTION, GLOBAL_DOCUMENT)
        const currentStats = await StatsService.getAllStatsForGlobal()
        currentStats.conversions = await incrementFieldValueForDoc(doc, docRef, 'conversions')
        return currentStats
    }

    static getAllStatsForGlobal = async () => {
        // Global should always exist
        const { doc, docRef } = await getDocAndRefs(GLOBAL_COLLECTION, GLOBAL_DOCUMENT)

        console.log(doc)
        console.log(docRef)

        return {
            convos: doc.data().convos,
            conversions: doc.data().conversions
        }
    }

}

async function getOrCreateStatsForDoc(doc, docRef) {
    if (doc.id == GLOBAL_DOCUMENT) {
        throw new Error('Cannot overwrite global stats!')
    }

    if (doc.data().convos && doc.data().conversions) {
        // Already exists
        return { convos: doc.data().convos, conversions: doc.data().conversions }
    }

    const stats = {
        convos: doc.data().convos ? doc.data().convos : 0,
        conversions: doc.data().conversions ? doc.data().conversions : 0
    }

    await docRef.update(stats)

    return stats
}

async function incrementFieldValueForDoc(doc, docRef, fieldName) {
    let newCount
    if (!doc.data()[fieldName]) {
        newCount = 1
    } else {
        newCount = doc.data()[fieldName] + 1
    }

    await docRef.update({
        [fieldName]: newCount
    })

    return newCount
}