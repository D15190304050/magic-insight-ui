import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import AuthKeys from "../../constants/AuthKeys.ts";
import {useDispatch, useSelector} from "react-redux";
import {isNullOrUndefined} from "../../commons/Common.ts";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import type {Location} from "@remix-run/router";
import {getLoginStateFromCookie} from "../../apis/login/LoginStateHandler.ts";
import {Dispatch} from "redux";

const Authenticated = ({children}) => {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const userInfo = useSelector((state) => state.userInfo);

    const hasLoggedIn: boolean = !isNullOrUndefined(userInfo);

    useEffect(() => {
        (
            async () => {
                // Do nothing if the user has logged in.
                if (hasLoggedIn)
                    return;

                // Step 1: Try to get it from cookie / localStorage.
                // Step 2: If there is no valid token, jump to login page.

                // Step 1.
                const loginSuccess: boolean = await getLoginStateFromCookie(dispatch);
                if (loginSuccess)
                    return;

                // Step 2.
                const loginRedirectUrl: string = AuthKeys.LoginUrl + "?" + AuthKeys.RedirectUrl + "=" + location.pathname.substring(1);
                console.log("loginRedirectUrl = " + loginRedirectUrl);
                navigate(loginRedirectUrl);
            }
        )();
    }, []);

    return (hasLoggedIn ? <div>{children}</div> : <div></div>);
}

export default Authenticated;

/*
    组件的主要功能是：
    1、检查用户是否已登录（通过 Redux 中的 userInfo 状态）
    2、如果未登录，尝试从 cookie/localStorage 恢复登录状态
    3、如果恢复失败，重定向到登录页面并携带当前路径作为重定向参数
 */