import {Layout, Menu} from "antd";
import {useEffect, useState} from "react";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import {FollowMenuItem, UserFollowCount} from "../../dtos/FollowInfo.ts";
import FollowInfoList from "../FollowInfoList";
import FollowType from "../../constants/FollowType.ts";
import axiosWithInterceptor from "../../axios/axios.tsx";

const DefaultPageSize: number = 20;
const { Sider, Content } = Layout;

const FollowingAndFollowerPage = () =>
{
    const [followCount, setFollowCount] = useState<UserFollowCount>({followingCount: 0, followerCount: 0});
    const [currentFollowMenuKey, setCurrentFollowMenuKey] = useState<string>(FollowType.Followings);

    const followMenuItems: FollowMenuItem[] = [
        {
            key: FollowType.Followings,
            icon: <UserOutlined />,
            title: "My followings",
            count: followCount.followingCount
        },
        {
            key: FollowType.Followers,
            icon: <TeamOutlined />,
            title: "My followers",
            count: followCount.followerCount
        }
    ];

    const renderFollowMenuItem = (followMenuItem: FollowMenuItem) =>
    {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <span>
                    {followMenuItem.icon}
                    {followMenuItem.title}
                </span>
                <span>{followMenuItem.count}</span>
            </div>
        );
    }

    /*
    具体解释：使用了参数解构的语法
    {key}：直接从参数对象中提取 key 属性
    : { key: string }：这是TypeScript的类型注解，说明参数是一个对象，且该对象必须有 key 属性，类型为 string

    相当于传统的
    const changeFollowType = (args) => {
    const key = args.key;
    setCurrentFollowMenuKey(key);
}

    获取被点击菜单项的标识(key)，并更新当前选中的菜单状态
    这种参数解构的写法是React开发中的常见模式，特别适合处理只关心部分数据的事件回调。
     */

    const changeFollowType = ({key}: { key: string }) =>
    {
        setCurrentFollowMenuKey(key);
    }

    useEffect(() =>
    {
        axiosWithInterceptor.get("/api/user-following/follow-count")
            .then(response =>
            {
                const userFollowCount: UserFollowCount = response.data.data;
                setFollowCount(userFollowCount);
            });
    }, [currentFollowMenuKey]);

    return (
        <div>
            <Layout style={{ minHeight: '60vh' }}>
                <Sider width={256}>
                    <Menu
                        selectedKeys={[currentFollowMenuKey]}
                        onClick={changeFollowType}
                        mode="inline"
                        style={{ height: '100%', borderRight: 0, textAlign: 'left' }}
                        items={followMenuItems.map((item) =>
                            (
                                {
                                    key: item.key,
                                    label: renderFollowMenuItem(item)
                                }
                            )
                        )}
                    />
                </Sider>
                <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 360}}>
                    <FollowInfoList defaultPageSize={DefaultPageSize} followType={currentFollowMenuKey}/>
                </Content>
            </Layout>
        </div>
    );
}

export default FollowingAndFollowerPage;