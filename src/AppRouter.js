/**
 * Determines which screen / experience the app should route to, based on current user state, like:
 * 
 * - Is logged in
 * - Does belong to a ministry
 * - Is a ministry admin
 * 
 * Etc.
 */
import { ContactsStates } from './presentation/redux/Contacts'
import { MinistryMgmtStates } from './presentation/redux/MinistryMgmt'
import handleError, { AUTH_ERROR, CONTACTS_ERROR, TIMEOUT_ERROR } from './utils/GlobalErrorHandler'

export default {
    routeByState: ({
        // State params
        user,
        hasCheckedAuth,
        ministry,
        contactsState,
        contacts,
        logInError,
        contactsError,
        genericError,

        // Callback functions
        goToWelcome,
        refreshMinistryStatus,
        goToAdminHome,
        goToSharerHome,
        checkForContacts
    }) => {
        goToWelcome()

        // TODO

        // if (!hasCheckedAuth) {
        //     return
        // }

        // if (user == null) {
        //     // Not logged in --> go to welcome screen
        //     goToWelcome()
        // } else if (ministry.ministryState == MinistryMgmtStates.NOT_READY) {
        //     // Logged in; update ministry status
        //     refreshMinistryStatus(user)
        // } else if (ministry.ministryState == MinistryMgmtStates.REFRESHING) {
        //     // do nothing
        // } else if (ministry.isAdmin) {
        //     // Go to ministry admin page
        //     goToAdminHome()
        // } else if (contacts && contacts.length) {
        //     // Logged in & has contacts --> go to home screen
        //     goToSharerHome()
        // } else if (contactsState == ContactsStates.NOT_READY) {
        //     // Logged in, but has not checked for contacts --> check first
        //     checkForContacts(user.uid)
        // } else if (contactsState !== ContactsStates.LOADING) {
        //     // Logged in, already checked for contacts, no contacts
        //     goToWelcome()
        // }

        // if (logInError != null || contactsError != null || genericError.error != null) {
        //     if (logInError != null) handleError(AUTH_ERROR, logInError)
        //     if (contactsError != null) handleError(CONTACTS_ERROR, contactsError)
        //     if (genericError.error != null) handleError(TIMEOUT_ERROR, genericError.error)

        //     // Just go to welcome screen in the current state
        //     goToWelcome()
        // }
    }
}