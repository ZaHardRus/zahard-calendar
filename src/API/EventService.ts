import axios from "axios";
import {IEvent} from "../models/event";

export class EventService {
    static async getAllEventsByReason(reason: 'guest' | 'author', username: string) {
        const {data: events} = await axios.get<Array<IEvent>>(`/events?${reason}=${username}`)
        return events
    }

    static async removeEventById(id: string) {
        return await axios.delete(`/events/${id}`)
    }

    static async addNewEvent(event: IEvent) {
        return await axios.post(`/events`, event)
    }

    static async toggleStatusById({id, prevStatus}: { id: string, prevStatus: boolean }) {
        return await axios.patch(`/events/${id}`, {isCompleted: !prevStatus})
    }
}