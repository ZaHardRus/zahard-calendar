import React from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {Button, Layout, Menu, Row} from "antd";

export const Header = () => {
    const {isAuth, user, status} = useAppSelector(state => state.auth)
    const {reason} = useAppSelector(state => state.event)
    const {logout, toggleReason, setStatus} = useActions()
    const logoutHandler = () => {
        logout()
    }
    return (
        <div>
            {
                isAuth
                    ? <Layout.Header className={'header'}>
                        <Row justify={"space-between"}>
                            <div className={'header__button-wrapper'}>
                                <Button
                                    type={reason === 'guest' ? 'primary' : 'default'}
                                    onClick={() => toggleReason('guest')}>Назначены мне</Button>
                                <Button
                                    type={reason === 'author' ? 'primary' : 'default'}
                                    onClick={() => toggleReason('author')}>Назначены мною</Button>
                            </div>

                            <div style={{color: '#fff'}}>{user?.username}</div>
                            <Menu theme={'dark'} mode="horizontal" selectable={false}>
                                <Menu.Item key={1} onClick={logoutHandler}>Выйти</Menu.Item>
                            </Menu>
                        </Row>
                    </Layout.Header>

                    :
                    <Layout.Header>
                        <Row justify={"end"}>
                            <Menu theme={'dark'} mode="horizontal" selectable={false}>
                                <Menu.Item
                                    onClick={() => setStatus(status === 'login' ? 'registration' : 'login')}
                                    key={1}>{status === 'login' ? 'Авторизация' : 'Регистрация'} </Menu.Item>
                            </Menu>
                        </Row>
                    </Layout.Header>
            }
        </div>
    )
}