import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './Auth'
import { accountReducer } from './Account'
import { ministryReducer } from './Ministry'
import { statsReducer } from './Stats'
import { contactsReducer } from './Contacts'
import { shareReducer } from './Share'

import ErrorRedux from './Errors'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default class GlobalRedux {
    static reducer = combineReducers({
        auth: authReducer,
        account: accountReducer,
        ministry: ministryReducer,
        stats: statsReducer,
        contacts: contactsReducer,
        share: shareReducer,

        errors: ErrorRedux.reducer
    })

    static store = createStore(
        GlobalRedux.reducer,
        
        composeWithDevTools(
            applyMiddleware(
                thunk,
                logger,
                ErrorRedux.breadcrumbMiddleware
            )
        )
    )
}