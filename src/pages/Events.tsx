import React, {useEffect, useState} from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {EventCalendar} from "../components/EventCalendar";
import {EventForm} from "../components/EventForm";

import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, ConfigProvider, Layout, Modal} from "antd";

import ruRU from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';


export const Events: React.FC<any> = () => {
    const [EventFormVisible, setEventFormVisible] = useState(false)

    const {events, reason} = useAppSelector(state => state.event)
    const username = useAppSelector(state => state.auth.user?.username) as string

    const {fetchGuests, fetchEventByReason} = useActions()

    useEffect(() => {
        fetchGuests()
        fetchEventByReason({reason, username})
    }, [username, reason])

    return (
        <Layout className={'calendar'}>
            <ConfigProvider locale={ruRU}>
                <EventCalendar events={events}/>
                <Button type={'primary'} className={'add-btn'}
                        onClick={() => setEventFormVisible(true)}><PlusCircleOutlined/></Button>
                <Modal
                    visible={EventFormVisible}
                    onCancel={() => setEventFormVisible(false)}
                    title={'Добавить событие'}
                    footer={null}
                >
                    <EventForm setEventFormVisible={setEventFormVisible}/>
                </Modal>
            </ConfigProvider>
        </Layout>
    )
}