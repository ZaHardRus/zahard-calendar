import {Navigate, useRoutes} from "react-router-dom";
import {Login} from "../pages/Login";
import {Events} from "../pages/Events";
import {useAppSelector} from "../store/hooks";

export const AppRouter = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const routes = (isAuth: boolean) => [
        {
            path: '/*',
            element: isAuth ? <Events/> : <Navigate to="/login"/>,
        },

        {
            path: '/login',
            element: !isAuth ? <Login/> : <Navigate to="/"/>,
        },
    ];

    const routing = useRoutes(routes(isAuth))

    return (
        <>
            {routing}
        </>
    )
}

