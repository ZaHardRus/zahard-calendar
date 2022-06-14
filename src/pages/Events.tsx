import {Button, Layout, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import {EventCalendar} from "../components/EventCalendar";
import {EventForm} from "../components/EventForm";
import {useActions, useAppSelector} from "../store/hooks";

export const Events: React.FC<any> = () => {
    const [EventFormVisible, setEventFormVisible] = useState(false)
    const {events} = useAppSelector(state => state.event)
    const username = useAppSelector(state => state.auth.user?.username) as string
    const {fetchGuests, fetchEvents} = useActions()

    useEffect(() => {
        fetchGuests()
        fetchEvents(username)
    }, [])

    return (
        <Layout className={'calendar'}>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={() => setEventFormVisible(true)} size={"large"}>Добавить событие</Button>
            </Row>
            <Modal
                visible={EventFormVisible}
                onCancel={() => setEventFormVisible(false)}
                title={'Добавить событие'}
                footer={null}
            >
                <EventForm/>
            </Modal>
        </Layout>
    )
}