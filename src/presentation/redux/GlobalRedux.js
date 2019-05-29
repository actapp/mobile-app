import { createStore, combineReducers, applyMiddleware } from 'redux'

import { authReducer } from './Auth'
import { accountReducer } from './Account'
import { ministryReducer } from './Ministry'
import { statsReducer } from './Stats';

import LogInRedux from './LogIn'
import ContactsRedux from './Contacts'
import ShareRedux from './Share'
import ErrorRedux from './Errors'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default class GlobalRedux {
    static reducer = combineReducers({
        auth: authReducer,
        account: accountReducer,
        ministry: ministryReducer,
        stats: statsReducer,
        share: ShareRedux.reducer,
        errors: ErrorRedux.reducer,

        // Old
        logIn: LogInRedux.reducer,
        contacts: ContactsRedux.reducer
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