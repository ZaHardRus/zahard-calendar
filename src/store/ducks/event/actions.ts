import {
    EventActionEnum,
    FetchEventsAction,
    SetErrorEventActions,
    SetEventAction,
    SetGuestsAction,
    SetIsLoadingEventAction
} from "./types";
import {IUser} from "../../../models/user";
import {IEvent} from "../../../models/event";
import {AppDispatch} from "../../index";
import axios from "axios";


export const EventAC = {
    setGuests: (payload: Array<IUser>): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    setError: (payload: string): SetErrorEventActions => ({type: EventActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingEventAction => ({type: EventActionEnum.SET_IS_LOADING, payload}),
    fetchAllEvents:(payload:Array<IEvent>):FetchEventsAction =>({type:EventActionEnum.FETCH_EVENTS,payload}),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventAC.setIsLoading(true))
            const {data: guests} = await axios.get('http://localhost:3001/users')
            if (guests) {
                dispatch(EventAC.setGuests(guests))
            } else {
                dispatch(EventAC.setError('Ошибка при запросе гостей'))
            }
        } catch (e) {
            dispatch(EventAC.setError('Ошибка при получении гостей'))
        }
    },
    fetchEvents: (username:string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventAC.setIsLoading(true))
            const {data: events} = await axios.get<Array<IEvent>>(`http://localhost:3001/events`)
            const validEvents = events.filter(el=>el.author === username || el.guest === username)

            if(validEvents){
                dispatch(EventAC.fetchAllEvents(validEvents))
            }else{
                dispatch(EventAC.setError('Ошибка при запросе событий'))
            }
        } catch (e) {
            dispatch(EventAC.setError('Ошибка при получении гостей'))
        }
    },


    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const {data} = await axios.post('http://localhost:3001/events', event)
            if (data) {
                dispatch(EventAC.setEvents(data))
            }else{
                dispatch(EventAC.setError('Ошибка при добавлении события'))
            }
        } catch (e) {

        }
    }
}