import {EventActionEnum, EventsActions, EventState} from "./types";

const initialState: EventState = {
    guests: [],
    events: [],
    isLoading: false,
    error: ''
}
export const eventReducer = (state: EventState = initialState, action: EventsActions): EventState => {
    switch (action.type) {
        case EventActionEnum.SET_GUESTS: {
            return {...state, guests: action.payload, isLoading: false}
        }
        case EventActionEnum.SET_EVENTS: {
            return {
                ...state,
                events: [...state.events, action.payload],
                isLoading: false
            }
        }
        case EventActionEnum.FETCH_EVENTS: {
            return {...state, events: action.payload}
        }
        case EventActionEnum.SET_IS_LOADING: {
            return {...state, isLoading: action.payload}
        }
        case EventActionEnum.SET_ERROR: {
            return {...state, error: action.payload, isLoading: false}
        }
        case EventActionEnum.TOGGLE_STATUS:{
            return {
                ...state,
                events: [...state.events.map(el => el.id === action.payload.id
                    ? {...el,isCompleted:action.payload.newStatus}
                    : el)]
            }
        }
        default:
            return state
    }
}