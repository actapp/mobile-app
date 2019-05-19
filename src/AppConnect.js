import { LogInActions } from './presentation/redux/LogIn'
import { ContactsActions } from './presentation/redux/Contacts'
import { MinistryMgmtActions } from './presentation/redux/MinistryMgmt'
import { ErrorActions } from './presentation/redux/Errors'

export default {
    mapStateToProps: state => ({
        hasCheckedAuth: state.logIn.hasCheckedAuth,
        user: state.logIn.user,
        logInState: state.logIn.logInState,
        logInError: state.logIn.error,
        contactsError: state.contacts.error,
        contactsState: state.contacts.contactsState,
        genericError: { error: state.errors.lastError, errorSource: state.errors.lastErrorSource },
        contacts: state.contacts.contacts,
        ministry: state.ministry
    }),

    mapDispatchToProps: dispatch => ({
        checkForLogIn: () => dispatch(LogInActions.checkForLogIn()),
        listenForAuthChanges: () => dispatch(LogInActions.listenForAuthChanges()),
        stopListeningForAuthChanges: () => dispatch(LogInActions.stopListeningForAuthChanges()),
        checkForContacts: (uid) => dispatch(ContactsActions.refreshContacts(uid)),
        refreshMinistryStatus: (user) => dispatch(MinistryMgmtActions.refreshMinistryStatus(user)),
        timeout: (source) => dispatch(ErrorActions.timeout(source))
    })
}