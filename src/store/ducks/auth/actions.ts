import {AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/user";
import {AppDispatch} from "../..";
import axios from "axios";

export const AuthAC = {
    setIsAuth: (payload: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser | null): SetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),

    login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthAC.setIsLoading(true))
            setTimeout(async () => {
                const {data: users} = await axios.get<Array<IUser>>('http://localhost:3001/users')
                const result = users.find((el: IUser) => el.username === username && el.password === password)
                if (result) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', result.username)
                    dispatch(AuthAC.setIsAuth(true))
                    dispatch(AuthAC.setUser(result))
                } else {
                    dispatch(AuthAC.setError('Пользователь не найден'))
                }
            }, 2000)
        } catch (e) {
            dispatch(AuthAC.setError('login error'))
        }
    },

    logout: (): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthAC.setIsLoading(true))
            localStorage.removeItem('username')
            localStorage.removeItem('auth')
            dispatch(AuthAC.setUser(null))
            dispatch(AuthAC.setIsAuth(false))
        } catch (e) {
            dispatch(AuthAC.setError('logout error'))
        }
    }
}