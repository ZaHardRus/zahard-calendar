import React, {useState} from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {Button, Card, Form, Input, Layout, Row} from "antd";

export const Login: React.FC<any> = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading, error, status} = useAppSelector(state => state.auth)


    const {login, registration, setStatus} = useActions()
    const loginSubmit = () => login(username, password)
    const registrationSubmit = () => registration(username, password)


    return (
        <Layout>
            <Row justify={"center"} align={"middle"} className={'login'}>
                <Card>
                    <Form onFinish={status === 'login' ? loginSubmit : registrationSubmit}>
                        {error && <div style={{margin: '0 auto', color: 'red'}}>{error}</div>}
                        <Form.Item
                                   rules={[{required: true, message: 'Please input your username'}]}
                                   name={'username'}>
                            <Input placeholder={"Имя пользователя"} value={username} onChange={e => setUsername(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                                   rules={[{required: true, message: 'Please input your password'}]}
                                   name={'password'}>
                            <Input placeholder={"Пароль"}  type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Item>

                        <Form.Item className='login-form__buttons'>
                            <Button
                                style={{color:'#1890ff'}}
                                onClick={() => setStatus(status === 'login' ? 'registration' : 'login')}
                                type='text'>{status === 'login' ? 'Нет аккаунта?' : 'К авторизации'}</Button>
                            <Button htmlType='submit'
                                    type='primary'
                                    loading={isLoading}>{status === 'login' ? 'Войти' : 'Регистрация'}</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Layout>
    )
}