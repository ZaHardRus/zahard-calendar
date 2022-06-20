import {Dispatch, FC, SetStateAction, useState} from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {formatDate} from "../utils/formatDate";
import {IEvent} from "../models/event";

import {Button, DatePicker, Form, Row, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";

import moment, {Moment} from "moment";


interface EventFormProps {
    setEventFormVisible: Dispatch<SetStateAction<boolean>>
}

export const EventForm: FC<EventFormProps> = ({setEventFormVisible}) => {
    const {guests} = useAppSelector(state => state.event)
    const author = useAppSelector(state => state?.auth?.user?.username) as string

    const [event, setEvent] = useState<IEvent>({author, date: '', guest: '', description: '', isCompleted: false})

    const {createEvent} = useActions()

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent(prev => ({...prev, date: formatDate(date?.toDate())}))
        }
    }
    const submitForm = (e: any) => {
        createEvent(event)
        setEvent(() => ({author, guest: '', date: '', description: '', isCompleted: false}))
        setEventFormVisible(false)
    }
    return (
        <Form onFinish={submitForm} initialValues={{description: '', date: moment(), guest: ''}}>

            <Form.Item label={'Описание события'} name={'description'}>
                <TextArea value={event.description} rows={6} autoSize
                          onChange={(e) => setEvent(prev => ({...prev, description: e.target.value}))}/>
            </Form.Item>

            <Form.Item label={'Дата'} name={'date'}>
                <DatePicker onChange={date => selectDate(date)}/>
            </Form.Item>

            <Form.Item label={'Пользователи'} name={'guest'}>
                <Select onChange={guest => setEvent(prev => ({...prev, guest: guest}))}>
                    {guests.length && guests.map(el =>
                        <Select.Option key={el.username} value={el.username}>
                            {el.username}
                        </Select.Option>)}
                </Select>
            </Form.Item>

            <Row justify={"end"}>
                <Form.Item>
                    <Button htmlType='reset'>Reset</Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Создать событие</Button>
                </Form.Item>
            </Row>

        </Form>
    )
}