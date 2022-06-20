import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./index";
import {bindActionCreators} from "redux";
import {AuthAC} from "./ducks/auth/actions";
import {EventAC} from "./ducks/event/actions";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators({...AuthAC, ...EventAC}, dispatch)
}