import {IEvent} from "../../../models/event"
import {IUser} from "../../../models/user";

export interface EventState {
    guests: Array<IUser>
    events: Array<IEvent>
    isLoading: boolean
    error: string
}

export enum EventActionEnum {
    SET_GUESTS = 'event/SET_GUESTS',
    SET_EVENTS = 'event/SET_EVENTS',
    SET_IS_LOADING = 'event/SET_IS_LOADING',
    SET_ERROR = 'event/SET_ERROR',
    FETCH_EVENTS = 'event/FETCH_EVENTS'
}

export interface SetGuestsAction {
    type: EventActionEnum.SET_GUESTS,
    payload: Array<IUser>
}

export interface SetEventAction {
    type: EventActionEnum.SET_EVENTS,
    payload: IEvent
}

export interface SetErrorEventActions {
    type: EventActionEnum.SET_ERROR,
    payload: string
}

export interface SetIsLoadingEventAction {
    type: EventActionEnum.SET_IS_LOADING,
    payload: boolean
}
export interface FetchEventsAction {
    type:EventActionEnum.FETCH_EVENTS,
    payload:Array<IEvent>
}

export type EventsActions =
    SetGuestsAction |
    SetEventAction |
    SetErrorEventActions |
    SetIsLoadingEventAction |
    FetchEventsAction