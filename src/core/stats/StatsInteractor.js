import { StatsService } from '../../AppDI'

export async function getStats(uid, mid, role) {
    return await StatsService.getStats(uid, mid, role)
}