import firebase from 'react-native-firebase'

import getDoc from '../util/DocManagement'

export default class MinistryService {
    static setMinistryId = async (uid, ministryId) => {
        const { ref } = await getDoc(uid)
        await ref.update({ ministryId: ministryId })
    }

    static getMinistryId = async (uid) => {
        const { doc } = await getDoc(uid)

        console.log('Got doc')

        const ministryId = doc.data().ministryId
        if (ministryId != null) {
            return ministryId
        }

        return ''
    }

    static isAdmin = async (phoneNumber, mid) => {
        const ref = docRef(mid)
        const doc = await ref.get()

        validateMinistryDoc(doc, mid)
        return _isAdmin(doc, phoneNumber)
    }

    static getCharts = async (phoneNumber, mid) => {
        const ref = docRef(mid)
        const doc = await ref.get()

        validateMinistryDoc(doc, mid)
        const isAdminUser = _isAdmin(doc, phoneNumber)

        if(!isAdminUser) {
            return []
        }

        const adminChartsRef = ref.collection('admin').doc('charts')
        const chartsDoc = await adminChartsRef.get()

        if(!chartsDoc.exists) {
            return []
        }

        const chartsObj = chartsDoc.data()

        // Return an array of chart objects
        return Object.keys(chartsObj).map(key => {
            return chartsObj[key]
        })
    }
}

function docRef(mid) {
    console.log('Getting doc for MID: ' + mid)

    return firebase.firestore().collection('ministries').doc(mid)
}

function adminChartsRef(mid) {
    return docRef(mid).collection('admin').doc('charts')
}

function validateMinistryDoc(doc, mid) {
    if (!doc.exists || !doc.data()) {
        throw new Error('Invalid ministry ID: ' + mid)
    }
}

function _isAdmin(doc, phoneNumber) {
    const adminUsers = doc.data().adminUsers

    if(adminUsers == null) {
        return false
    }

    return adminUsers.find(element => {
        return element == phoneNumber
    }) != null
}