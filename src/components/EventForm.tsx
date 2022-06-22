import {Dispatch, FC, FormEvent, SetStateAction, useState} from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {formatDate} from "../utils/formatDate";
import {IEvent} from "../models/event";

import {Button, DatePicker, Row, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";

import {Moment} from "moment";


interface EventFormProps {
    setEventFormVisible: Dispatch<SetStateAction<boolean>>
}

export const EventForm: FC<EventFormProps> = ({setEventFormVisible}) => {
    const author = useAppSelector(state => state?.auth?.user?.username) as string
    const {guests} = useAppSelector(state => state.event)

    const [event, setEvent] = useState<IEvent>({author, date: '', guest: author, description: '', isCompleted: false})

    const {createEvent} = useActions()

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent(prev => ({...prev, date: formatDate(date?.toDate())}))
        }
    }
    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        createEvent(event)
        setEvent(() => ({author, guest: '', date: '', description: '', isCompleted: false}))
        setEventFormVisible(false)
    }
    return (
        <form onSubmit={submitForm}>
            <div>
                <TextArea
                    placeholder='Добавить текст события'
                    value={event.description}
                    rows={2}
                    autoSize
                    onChange={(e) => setEvent(prev => ({...prev, description: e.target.value}))}/>
            </div>

            <div>
                <span>Дата:</span>
                <DatePicker style={{width: '75%'}}
                            onChange={date => selectDate(date)}/>
            </div>

            <div>
                <span>Исполнитель:</span>
                <Select style={{width: '75%'}}
                        value={event.guest}
                        onChange={guest => setEvent(prev => ({...prev, guest: guest}))}>
                    {guests.length && guests.map(el =>
                        <Select.Option key={el.username} value={el.username}>
                            {el.username}
                        </Select.Option>)}
                </Select>
            </div>

            <Row justify={"end"}>
                <Button htmlType='submit'>Создать событие</Button>
            </Row>

        </form>
    )
}