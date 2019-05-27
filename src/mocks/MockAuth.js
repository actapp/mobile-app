export default class MockAuth {
    constructor(config) {
        this.config = config
        this.phoneNumberSigningIn = null
        this.listeners = []

        this.user = null

        if (this.config.loggedInUser != null) {
            this.user = new MockUser(this.config.loggedInUser.uid, this.config.loggedInUser.phoneNumber)
        }
    }

    updateUser = user => {
        this.user = user
        for (let i = 0; i < listeners.length; i++) {
            this.listeners[i].onAuthStateChanged(user)
        }
    }

    onAuthStateChanged = listener => {
        this.listeners.push(listener)
        listener(this.user)
    }

    signInWithPhoneNumber = async phoneNumber => {
        this.phoneNumberSigningIn = phoneNumber
        return {
            confirm: this.confirm
        }
    }

    confirm = async code => {
        // Confirm everything
        if (this.config.existingUser != null && this.config.existingUser.phoneNumber == this.phoneNumberSigningIn) {
            this.user = new MockUser(this.config.existingUser.uid, this.config.existingUser.phoneNumber)
        } else {
            this.user = new MockUser(this.phoneNumberSigningIn.substring(0, 3), this.phoneNumberSigningIn)
        }
        
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