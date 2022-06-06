import {FC, useState} from "react";
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {useActions, useAppSelector} from "../store/hooks";
import {IEvent} from "../models/event";
import {Moment} from "moment";
import {formatDate} from "../utils/formatDate";

export const EventForm: FC = () => {
    const [event, setEvent] = useState<IEvent>({author: '', date: '', guest: '', description: ''})
    const {guests} = useAppSelector(state => state.event)
    const author = useAppSelector(state => state?.auth?.user?.username) as string
    const {createEvent} = useActions()
    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent(prev => ({...prev, date: formatDate(date?.toDate())}))
        }
    }
    const submitForm = () => {
        createEvent({author, date: event.date, description: event.description, guest: event.guest})
    }
    return (
        <Form onFinish={submitForm}>

            <Form.Item label={'Описание события'} name={'description'}>
                <Input value={event.description}
                       onChange={(e) => setEvent(prev => ({...prev, description: e.target.value}))}/>
            </Form.Item>

            <Form.Item label={'Дата'} name={'date'}>
                <DatePicker onChange={date => selectDate(date)}/>
            </Form.Item>

            <Form.Item label={'Пользователи'} name={'guest'}>
                <Select style={{width: 120}} onChange={guest => setEvent(prev => ({...prev, guest: guest}))}>
                    {guests.length && guests.map(el =>
                        <Select.Option key={el.username} value={el.username}>
                            {el.username}
                        </Select.Option>)}
                </Select>
            </Form.Item>

            <Row justify={"end"}>
                <Form.Item>
                    <Button htmlType='submit'>Создать событие</Button>
                </Form.Item>
            </Row>

        </Form>
    )
}