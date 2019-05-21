import { createStore, combineReducers, applyMiddleware } from 'redux'

import AuthRedux from './Auth'

import LogInRedux from './LogIn'
import ContactsRedux from './Contacts'
import ShareRedux from './Share'
import MinistryMgmtRedux from './MinistryMgmt'
import ErrorRedux from './Errors'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default class GlobalRedux {
    static reducer = combineReducers({
        auth: AuthRedux.auth,
        logIn: LogInRedux.reducer,
        contacts: ContactsRedux.reducer,
        share: ShareRedux.reducer,
        ministry: MinistryMgmtRedux.reducer,
        errors: ErrorRedux.reducer
    })

    static store = createStore(
        GlobalRedux.reducer,
        applyMiddleware(
            thunk,
            logger,
            ErrorRedux.breadcrumbMiddleware
        )
    )
}