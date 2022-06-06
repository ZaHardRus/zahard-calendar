import {AuthActionEnum, AuthActions, AuthState} from "./types"


const initialState: AuthState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: ''
}
export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_IS_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}

        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload, isLoading: false}


        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}

        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}

        default:
            return state
    }
}