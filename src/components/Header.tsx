import {Layout, Menu, Row} from "antd";
import {useActions, useAppSelector} from "../store/hooks";
import {useDispatch} from "react-redux";
import {AuthAC} from "../store/ducks/auth/actions";

export const Header = () => {
    const {isAuth,user} = useAppSelector(state => state.auth)
    const {logout} = useActions()
    const logoutHandler = () => {
        logout()
    }
    return (
        <div>
            {
                isAuth
                    ? <Layout.Header>
                        <Row justify={"end"}>
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
                                <Menu.Item onClick={() => console.log('login')} key={1}> Авторизация </Menu.Item>
                            </Menu>
                        </Row>
                    </Layout.Header>
            }
        </div>
    )
}