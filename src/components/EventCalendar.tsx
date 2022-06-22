import {FC, useState} from "react";
import {useAppSelector} from "../store/hooks";

import {IEvent} from "../models/event";
import {formatDate} from "../utils/formatDate";
import {EventInfo} from "./EventInfo";

import {Calendar, Progress} from "antd";
import Modal from "antd/lib/modal/Modal";
import {Moment} from "moment";


interface EventCalendarProps {
    events: Array<IEvent>
}

export const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const {reason} = useAppSelector(state => state.event)
    const username = useAppSelector(state => state.auth.user?.username)

    const [isEventInfoVisible, setIsEventInfoVisible] = useState(false)
    const [eventInfo, setEventInfo] = useState<Array<IEvent>>([])

    function dateCellRender(value: Moment) {
        const formattedDate = formatDate(value.toDate());

        let currentDayEvents: Array<IEvent>;
        switch (reason) {
            case 'author':
                currentDayEvents = events
                    .filter(el => el.date === formattedDate && el.author === username)
                    .map(el => ({...el, key: el.id}));
                break
            case 'guest':
                currentDayEvents = events
                    .filter(el => el.date === formattedDate && el.guest === username)
                    .map(el => ({...el, key: el.id}));
                break
            default:
                return
        }

        const isCompletedLength = currentDayEvents.reduce((acc, el) => el.isCompleted ? acc + 1 : acc, 0)
        const percent = +((isCompletedLength / currentDayEvents.length) * 100).toFixed(0)
        return (
            <div onClick={() => {
                setEventInfo([...currentDayEvents])
                setIsEventInfoVisible(true)
            }}>

                {!!currentDayEvents.length && <Progress width={30} type="circle" percent={percent}/>}
            </div>
        );
    }

    return (
        <>
            <Calendar dateCellRender={dateCellRender}/>

            <Modal
                footer={null}
                width={'80%'}
                visible={isEventInfoVisible}
                onCancel={() => {
                    setEventInfo([])
                    setIsEventInfoVisible(false)
                }}>
                <EventInfo events={eventInfo} setEventInfo={setEventInfo}/>
            </Modal>
        </>
    );
};