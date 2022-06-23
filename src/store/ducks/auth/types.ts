import {IUser} from "../../../models/user"

export interface AuthState {
    isAuth: boolean,
    user: IUser | null,
    isLoading: boolean,
    error: string,
    status:'registration'|'login'
}

export enum AuthActionEnum {
    SET_IS_AUTH = 'auth/SET_IS_AUTH',
    SET_USER = 'auth/SET_USER',
    SET_IS_LOADING = 'auth/SET_IS_LOADING',
    SET_ERROR = 'auth/SET_ERROR',
    SET_STATUS = 'auth/SET_STATUS'
}

export interface SetIsAuthAction {
    type: AuthActionEnum.SET_IS_AUTH,
    payload: boolean
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR,
    payload: string
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER,
    payload: IUser | null
}

export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING,
    payload: boolean
}
export interface SetStatusAction{
    type: AuthActionEnum.SET_STATUS,
    payload:'login' | 'registration'
}

export type AuthActions =
    SetIsAuthAction |
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction |
    SetStatusAction