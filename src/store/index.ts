import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import {authReducer} from "./ducks/auth/reducer";
import {eventReducer} from "./ducks/event/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch