import {
    AuthActionEnum,
    SetErrorAction,
    SetIsAuthAction,
    SetIsLoadingAction,
    SetStatusAction,
    SetUserAction
} from "./types";
import {IUser} from "../../../models/user";
import {AppDispatch} from "../..";
import {UserService} from "../../../API/UserService";

export const AuthAC = {
    setIsAuth: (payload: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser | null): SetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setStatus: (payload: 'registration' | 'login'): SetStatusAction => ({type: AuthActionEnum.SET_STATUS, payload}),

    login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthAC.setIsLoading(true))
            setTimeout(async () => {
                const users = await UserService.getAllUsers()
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
    registration: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthAC.setIsLoading(true))
            const data = await UserService.registration(username, password)
            if (data) {
                dispatch(AuthAC.setStatus("login"))
            }
        } catch (e) {
            dispatch(AuthAC.setError('При регистрации произошла ошибка'))
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