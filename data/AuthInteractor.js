import firebase from 'react-native-firebase';

export function uid() {
    if(firebase.auth().currentUser !== null) {
        return firebase.auth().currentUser.uid
    }

    return null
}

export function listenForAuthenticationChange(callback, currentUser) {
    return firebase.auth().onAuthStateChanged(user => {
        // Only update if user has actually changed
        if(user == null) {
            if(currentUser !== null) {
                callback(null)
            }
        } else {
            console.log("User updated: " + user.uid)

            if(currentUser == null) {
                callback(user)
            } else {
                if(currentUser.uid !== user.uid) {
                    callback(user)
                }
            }
        }
    })
}