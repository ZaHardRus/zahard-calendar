import {Button, Calendar, Layout, Modal, Row } from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {EventCalendar} from "../components/EventCalendar";
import {EventForm} from "../components/EventForm";
import {useActions, useAppSelector} from "../store/hooks";

export const Events: React.FC<any> = () => {
    const [visible,setVisible] = useState(false)
    const {events} = useAppSelector(state => state.event)
    const username = useAppSelector(state => state.auth.user?.username) as string
    const {fetchGuests,fetchEvents} = useActions()

    useEffect(()=>{
        fetchGuests()
        fetchEvents(username)
    },[])

    return (
        <Layout className={'calendar'}>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={()=>setVisible(true)} size={"large"}>Добавить событие</Button>
            </Row>
            <Modal
                visible={visible}
                onCancel={()=>setVisible(false)}
                title={'Добавить событие'}
                footer={null}
            >
                <EventForm/>
            </Modal>
        </Layout>
    )
}