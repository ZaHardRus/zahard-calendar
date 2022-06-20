import React from "react";
import {useActions} from "../store/hooks";

import {IEvent} from "../models/event";

import {Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";


interface EventInfoProps {
    events: Array<IEvent>
    setEventInfo: (prev: any) => void
}

export const EventInfo: React.FC<EventInfoProps> = ({events, setEventInfo}) => {
    const {fetchToggleStatus, fetchDeleteEvent} = useActions()

    const toggleStatusHandler = async (value: boolean, parent: IEvent) => {
        await fetchToggleStatus({id: parent.id, prevStatus: value})
        setEventInfo((prev: Array<IEvent>) => [...prev.map((el: IEvent) => el.id === parent.id ? {
            ...el,
            isCompleted: !value
        } : el)])
    }

    const deleteTask = async (id: string) => {
        await fetchDeleteEvent(id)
        setEventInfo((prev: Array<IEvent>) => [...prev.filter(el => el.id !== id)])
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
                    key={parent.id}
                    onClick={() => toggleStatusHandler(value, parent)}
                    style={{color: value ? 'green' : 'red', cursor: 'pointer'}}>
                    {value ? 'completed' : 'progress'}
                </span>

        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (_: any, parent: IEvent) => <DeleteOutlined key={parent.id} onClick={() => deleteTask(parent.id)}/>
        },
    ];
    return (
        <Table columns={columns} dataSource={events}/>
    )
}