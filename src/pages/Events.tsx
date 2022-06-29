import React, {useEffect} from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {EventCalendar} from "../components/EventCalendar";
import {Layout} from "antd";
import 'moment/locale/ru';


export const Events: React.FC<any> = () => {
    const {events, reason} = useAppSelector(state => state.event)
    const username = useAppSelector(state => state.auth.user?.username) as string

    const {fetchGuests, fetchEventByReason} = useActions()

    useEffect(() => {
        fetchGuests()
        fetchEventByReason({reason, username})
    }, [username, reason])

    return (
        <Layout className={'calendar'}>
            <EventCalendar events={events}/>
        </Layout>
    )
}