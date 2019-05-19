import MinistryService from './MinistryService'

export async function setMinistryId(uid, mid) {
    await MinistryService.setMinistryId(uid, mid)
}

export async function getMinistryId(uid) {
    return await MinistryService.getMinistryId(uid)
}

export async function isAdmin(phoneNumber, mid) {
    console.log('Geting is admin fro ' + phoneNumber)
    return await MinistryService.isAdmin(phoneNumber, mid)
}

export async function getCharts(phoneNumber, mid) {
    return await MinistryService.getCharts(phoneNumber, mid)
}