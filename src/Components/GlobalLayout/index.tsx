import {Breadcrumb, Layout, Menu, theme, Input, Row, Col, MenuProps, Space, Dropdown, Button, message} from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import {useDispatch, useSelector} from 'react-redux';
import Authenticated from "../Authenticated";
import {isNullOrUndefined} from "../../commons/Common.ts";
import {logout} from "../../apis/login/LoginStateHandler.ts";
import {Dispatch} from "redux";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {useNavigate} from "react-router-dom";
import AuthKeys from "../../constants/AuthKeys.ts";
import RoutePaths from "../../constants/RoutePaths.ts";

const ColPush: number = 1;
const ColSpan: number = 22;

const { Search } = Input;
const { Header, Content, Footer } = Layout;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const GlobalLayout = ({children}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const userInfo = useSelector((state) => state.userInfo);
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const userMenuItems: MenuProps['items'] = isNullOrUndefined(userInfo) ? [] : [

        {
            key: "2",
            label: "视频管理",
        },
        {
            key: "10",
            label: "退出登录",
        }
    ];

    const onUserMenuClick: MenuProps['onClick'] = ({ key }) =>
    {
        switch (key)
        {
            case "2":
                navigate(RoutePaths.VideoManagement);
                break;
            case "10":
                logout(dispatch);
                navigate(AuthKeys.LoginUrl);
                break;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', width: "100vw" }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Row>
                    <Col>
                        <a href={"/"} style={{ fontSize: '20px' }}>AI课堂分析系统</a>
                    </Col>
                    <Col span={4} offset={17}>
                        <Dropdown menu={{items: userMenuItems, onClick: onUserMenuClick}}>
                            <a style={{ fontSize: '16px' }} onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {isNullOrUndefined(userInfo) ? "Log in" : userInfo.nickname}
                                </Space>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: "85vh",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,

                    }}
                >
                    <Row>
                        <Col push={ColPush} span={ColSpan}>
                            <Authenticated>{children}</Authenticated>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Magic Insight ©{new Date().getFullYear()} Powered by Forever-Peng
            </Footer>
        </Layout>
    );
};

export default GlobalLayout;