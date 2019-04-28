import firebase from 'react-native-firebase'

/**
 * Start a phone auth process
 * 
 * Returns a "confirmation" object which should be kept for use when confirming / verifying the code via verifyCode
 */
export async function startPhoneLogIn(mdn) {
    return await firebase.auth().signInWithPhoneNumber(mdn)
}

/**
 * Verify a 6-digit code entered by the user
 * 
 * Requires the confirmation object returned by startPhoneLogIn
 * 
 * Returns the user if verification successful, otherwise throws error
 */
export async function verifyCode(code, confirmation) {
    return await confirmation.confirm(code)
}

/**
 * Listen to authentication state changes
 * 
 * Returns a function that can be invoked to stop listening (i.e. in componentWillUnmount)
 */
export function setAuthenticationListener(listener) {
    return firebase.auth().onAuthStateChanged(listener)
}

export function getCurrentUser() {
    return firebase.auth().currentUser
}