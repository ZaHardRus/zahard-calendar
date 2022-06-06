import {IUser} from "../../../models/user"

export interface AuthState {
    isAuth: boolean,
    user: IUser | null,
    isLoading: boolean,
    error: string
}

export enum AuthActionEnum {
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
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

export type AuthActions =
    SetIsAuthAction |
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction