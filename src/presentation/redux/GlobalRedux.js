import { createStore, combineReducers, applyMiddleware } from 'redux'

import LogInRedux from './LogIn'
import ContactsRedux from './Contacts'
import ShareRedux from './Share'
import ErrorRedux from './Errors'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default class GlobalRedux {
    static reducer = combineReducers({
        logIn: LogInRedux.reducer,
        contacts: ContactsRedux.reducer,
        share: ShareRedux.reducer,
        errors: ErrorRedux.reducer
    })

    static store = createStore(GlobalRedux.reducer, applyMiddleware(thunk, logger, ErrorRedux.breadcrumbMiddleware))
}