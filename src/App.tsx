import React, {useEffect, useState} from 'react';
import './App.scss';
import {Header} from './components/Header';
import {AppRouter} from './routes/AppRouter';
import {ConfigProvider, Layout, Modal} from "antd";
import 'antd/dist/antd.min.css';
import {useActions} from "./store/hooks";
import {IUser} from "./models/user";
import {EventForm} from "./components/EventForm";

import ruRU from "antd/lib/locale/ru_RU";
import 'moment/locale/ru';

function App() {
    const {setUser, setIsAuth} = useActions();
    const [EventFormVisible, setEventFormVisible] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username')} as IUser)
            setIsAuth(true)
        }
    }, [])

    return (
        <Layout>
            <ConfigProvider locale={ruRU}>
                <Header setEventFormVisible={setEventFormVisible}/>
                <Layout.Content>
                    <AppRouter/>
                    <Modal
                        visible={EventFormVisible}
                        onCancel={() => setEventFormVisible(false)}
                        title={'Добавить событие'}
                        footer={null}
                    >
                        <EventForm setEventFormVisible={setEventFormVisible}/>
                    </Modal>
                </Layout.Content>
            </ConfigProvider>
        </Layout>

    );
}

export default App;
