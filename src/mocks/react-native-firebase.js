import MockAuth from './MockAuth'
import MockFirestore from './MockFirestore'

const auth = () => new MockAuth()
const firestore = () => MockFirestore

const firebase = {
    auth: auth,
    firestore: firestore
}

export {
    firebase
}