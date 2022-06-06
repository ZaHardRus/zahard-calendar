import React, {useEffect} from 'react';
import './App.css';
import {Header} from './components/Header';
import {AppRouter} from './routes/AppRouter';
import {Layout} from "antd";
import 'antd/dist/antd.min.css';
import {useActions} from "./store/hooks";
import {IUser} from "./models/user";

function App() {
    const {setUser, setIsAuth} = useActions()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username')} as IUser)
            setIsAuth(true)
        }
    }, [])
    return (
        <Layout>
            <Header/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>

    );
}

export default App;
