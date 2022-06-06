import {Badge, BadgeProps, Calendar} from "antd";
import { Moment } from "moment";
import {FC} from "react";
import {IEvent} from "../models/event";
import { formatDate } from "../utils/formatDate";
import {useAppSelector} from "../store/hooks";

interface EventCalendarProps{
    events:Array<IEvent>
}



export const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const {user} = useAppSelector(state => state.auth)
    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter(el => el.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((el) =>
                    <div>
                        <Badge text={el.description} color={el.author === user?.username ? "green" : "gray"} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};