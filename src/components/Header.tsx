import React from "react";
import {useActions, useAppSelector} from "../store/hooks";

import {Button, Layout, Menu, Row} from "antd";
import {CrownOutlined, PlusCircleOutlined, UserOutlined} from "@ant-design/icons";

export const Header = ({setEventFormVisible}: any) => {
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
                    ? <header className={'header'}>
                        <div className={'header__button-wrapper'}>
                            <Button
                                type={reason === 'guest' ? 'dashed' : 'link'}
                                className={"child"}
                                onClick={() => toggleReason('guest')}><UserOutlined/><span>Назначены мне</span></Button>
                            <Button
                                type={reason === 'author' ? 'dashed' : 'link'}
                                className={"child"}
                                onClick={() => toggleReason('author')}><CrownOutlined/><span>Назначены мною</span></Button>
                            <Button type={'primary'} className={'add-btn child'}
                                    onClick={() => setEventFormVisible(true)}><PlusCircleOutlined/>
                            </Button>
                        </div>


                        <Menu theme={'dark'} mode="horizontal" selectable={false}>
                            <div style={{color: '#fff'}}>{user?.username}</div>
                            <Menu.Item key={1} onClick={logoutHandler}>Выйти</Menu.Item>
                        </Menu>
                    </header>

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