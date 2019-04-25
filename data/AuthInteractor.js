import firebase from 'react-native-firebase';

export function uid() {
    if(firebase.auth().currentUser !== null) {
        return firebase.auth().currentUser.uid
    }

    return null
}

let currentUser = {}
Object.assign(currentUser, firebase.auth().currentUser)

export function listenForAuthenticationChange(callback) {
    firebase.auth().onAuthStateChanged(user => {
        // Only update if user has actually changed
        if(user == null) {
            if(currentUser !== null) {
                callback(null)
            }
        } else {
            if(currentUser !== null && user.uid !== currentUser.uid) {
                callback(user)
            } else if (currentUser == null) {
                callback(user)
            }
        }

        currentUser = user
    })
}