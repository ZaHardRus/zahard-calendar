import {
    DeleteEventAction,
    EventActionEnum,
    FetchEventsAction,
    SetErrorEventActions,
    SetEventAction,
    SetGuestsAction,
    SetIsLoadingEventAction,
    ToggleReasonAction,
    ToggleStatusAction
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
    fetchAllEvents: (payload: Array<IEvent>): FetchEventsAction => ({type: EventActionEnum.FETCH_EVENTS, payload}),
    toggleStatus: (payload: { id: string, newStatus: boolean }): ToggleStatusAction => ({
        type: EventActionEnum.TOGGLE_STATUS,
        payload
    }),
    deleteEvent: (payload: string): DeleteEventAction => ({type: EventActionEnum.DELETE_EVENT, payload}),
    toggleReason: (payload: 'guest' | 'author'): ToggleReasonAction => ({type: EventActionEnum.TOGGLE_REASON, payload}),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventAC.setIsLoading(true))
            const {data: guests} = await axios.get('/users')
            if (guests) {
                dispatch(EventAC.setGuests(guests))
            } else {
                dispatch(EventAC.setError('Ошибка при запросе гостей'))
            }
        } catch (e) {
            dispatch(EventAC.setError('Ошибка при получении гостей'))
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventAC.setIsLoading(true))
            const {data: events} = await axios.get<Array<IEvent>>(`/events?guest=${username}`)
            //const validEvents = events.filter(el => el.guest === username)

            if (events) {
                dispatch(EventAC.fetchAllEvents(events))
            } else {
                dispatch(EventAC.setError('Ошибка при запросе событий'))
            }
        } catch (e) {
            dispatch(EventAC.setError('Ошибка при получении гостей'))
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const {data} = await axios.post('/events', event)
            if (data) {
                dispatch(EventAC.setEvents(data))
            } else {
                dispatch(EventAC.setError('Ошибка при добавлении события'))
            }
        } catch (e) {

        }
    },
    fetchToggleStatus: ({id, prevStatus}: any) => async (dispatch: AppDispatch) => {
        try {
            const data = await axios.patch(`/events/${id}`, {isCompleted: !prevStatus})
            dispatch(EventAC.toggleStatus({id: data.data.id, newStatus: data.data.isCompleted}))
            return 1
        } catch (e) {
            EventAC.setError('Произошла ошибка при изменении статуса')
        }
    },
    fetchDeleteEvent: (id: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(`/events/${id}`)
            if (response.status === 200) {
                dispatch(EventAC.deleteEvent(id))
            }
        } catch (e) {
            EventAC.setError('Произошла ошибка при удалении ивента')
        }
    },
    fetchToggleReason: ({reason, username}: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventAC.setIsLoading(true))
            dispatch(EventAC.toggleReason(reason))
            const {data: events} = await axios.get<Array<IEvent>>(`/events?${reason}=${username}`)
            if (events) {
                dispatch(EventAC.fetchAllEvents(events))
                dispatch(EventAC.setIsLoading(false))
            }
        } catch (e) {
            dispatch(EventAC.setError('Произошла ошибка при запросе ивентов определенной категории'))
        }
    }
}