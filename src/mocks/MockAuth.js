export default class MockAuth {
    constructor() {
        this.user = null
        this.phoneNumberSigningIn = null
        this.listeners = []
    }

    updateUser = user => {
        this.user = user
        for (let i = 0; i < listeners.length; i++) {
            this.listeners[i].onAuthStateChanged(user)
        }
    }

    onAuthStateChanged = listener => {
        this.listeners.push(listener)
    }

    signInWithPhoneNumber = async phoneNumber => {
        this.phoneNumberSigningIn = phoneNumber
        return {
            confirm: this.confirm
        }
    }

    confirm = async code => {
        // Confirm everything
        this.user = new MockUser('123', this.phoneNumberSigningIn)
        this.phoneNumberSigningIn = null

        return this.user
    }

    getCurrentUser = () => {
        return this.user
    }

    signOut = () => {
        this.updateUser(null)
    }
}

class MockUser {
    constructor(uid, phoneNumber) {
        this.uid = uid
        this.phoneNumber = phoneNumber
    }
}