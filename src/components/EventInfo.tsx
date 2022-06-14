import {IEvent} from "../models/event";
import React from "react";
import {Table} from "antd";
import {useActions} from "../store/hooks";

interface EventInfoProps {
    events: Array<IEvent>
    setEventInfo: (prev: any) => void
}

export const EventInfo: React.FC<EventInfoProps> = ({events, setEventInfo}) => {
    const {fetchToggleStatus} = useActions()

    const toggleStatusHandler = (value: boolean, parent: IEvent) => {
        fetchToggleStatus({id: parent.id, prevStatus: value})
        setEventInfo((prev: any) => [...prev.map((el: IEvent) => el.id === parent.id ? {
            ...el,
            isCompleted: !value
        } : el)])
    }
    const columns = [
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Guest',
            dataIndex: 'guest',
            key: 'guest',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'isCompleted',
            key: 'isCompleted',
            render: (value: boolean, parent: IEvent) =>
                <span
                    onClick={() => toggleStatusHandler(value, parent)}
                    style={{color: value ? 'green' : 'red',cursor:'pointer'}}>
                    {value ? 'completed' : 'progress'}
                </span>

        },
    ];
    return (
        <Table columns={columns} dataSource={events}/>
    )
}