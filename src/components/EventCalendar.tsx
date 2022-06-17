import {Calendar, Progress} from "antd";
import {Moment} from "moment";
import {FC, useState} from "react";
import {IEvent} from "../models/event";
import {formatDate} from "../utils/formatDate";
import Modal from "antd/lib/modal/Modal";
import {EventInfo} from "./EventInfo";

interface EventCalendarProps {
    events: Array<IEvent>
}
export const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const [isEventInfoVisible, setIsEventInfoVisible] = useState(false)
    const [eventInfo, setEventInfo] = useState<Array<IEvent>>([])
    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter(el => el.date === formatedDate);
        const isCompletedLength = currentDayEvents.reduce((acc, el) => el.isCompleted ? acc + 1 : acc, 0)
        const percent = +((isCompletedLength / currentDayEvents.length) * 100).toFixed(0)
        return (
            <div onClick={() => {
                setEventInfo([...currentDayEvents])
                setIsEventInfoVisible(true)
            }}>

                {!!currentDayEvents.length && <Progress width={40} type="circle" percent={percent}/>}
            </div>
        );
    }

    return (
        <>
            <Calendar
                onSelect={()=>setIsEventInfoVisible(true)}
                dateCellRender={dateCellRender}
            />
            <Modal
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