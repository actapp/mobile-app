import { mockDelay } from './Util'

export default class StatsService {
    static getStats = async (uid, mid, role) => {
        await mockDelay()
        return require('../AppConfig').default.MOCK_SERVICES.stats.sharer.charts
    }
}