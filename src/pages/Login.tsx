import React, {useState} from "react";
import {Button, Card, Form, Input, Layout, Row} from "antd";
import {useDispatch} from "react-redux";
import {AuthAC} from "../store/ducks/auth/actions";
import {useActions, useAppSelector} from "../store/hooks";

export const Login: React.FC<any> = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading, error} = useAppSelector(state => state.auth)

    const {login} = useActions()
    const submit = () => login(username,password)

    return (
        <Layout>

            <Row justify={"center"} align={"middle"} className={'login'}>
                <Card>
                    <Form onFinish={submit}>
                        {error && <div style={{margin: '0 auto', color: 'red'}}>{error}</div>}
                        <Form.Item label={'Имя пользователя'}
                                   rules={[{required: true, message: 'Please input your username'}]}
                                   name={'username'}>
                            <Input value={username} onChange={e => setUsername(e.target.value)}/>
                        </Form.Item>

                        <Form.Item label={'Пароль'}
                                   rules={[{required: true, message: 'Please input your password'}]}
                                   name={'password'}>
                            <Input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' loading={isLoading}>Войти</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>

        </Layout>
    )
}