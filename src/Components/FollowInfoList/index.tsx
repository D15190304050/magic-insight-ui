import {Avatar, Button, List, message, Pagination, Spin, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {UserFollowingInfo} from "../../dtos/FollowInfo.ts";
import axiosWithInterceptor, {jsonHeader} from "../../axios/axios.tsx";
import qs from "qs";
import {PaginationParam} from "../../dtos/CommonQueryParams.ts"
import FollowType from "../../constants/FollowType.ts";

const UrlToGetFollowings: string = "/api/user-following/followings";
const UrlToGetFollowers: string = "/api/user-following/followers";
const TotalFollowings: string = "Total followings";
const TotalFollowers: string = "Total followers";

const FollowInfoList = ({defaultPageSize, followType}:
                            { defaultPageSize: number, followType: string }) =>
{
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [totalFollowings, setTotalFollowings] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [followingInfos, setFollowingInfos] = useState<UserFollowingInfo[]>([]);

    const setFollowState = (userId: number): void =>
    {
        const userFollowingInfo: UserFollowingInfo = followingInfos.filter(x => x.userId === userId)[0];
        const nextFollowState: boolean = !userFollowingInfo.followState;

        const updatedFollowingInfo: UserFollowingInfo[] = followingInfos.map(user =>
            user.userId === userId ?
                {...user, followState: nextFollowState} :
                user
        );
        setFollowingInfos(updatedFollowingInfo);

        if (nextFollowState)
        {
            axiosWithInterceptor.post("/api/user-following/follow", {userId: userId}, jsonHeader)
                .then(response =>
                {
                    message.info("Follow successfully.");
                });
        }
        else
        {
            axiosWithInterceptor.post("/api/user-following/unfollow", {userId: userId}, jsonHeader)
                .then(response =>
                {
                    message.info("Unfollow successfully.");
                });
        }
    }

    const onPageChange = (page: number, pageSize: number) => getFollowInfos(page, pageSize);

    const getFollowInfos = (page: number, pageSize: number) =>
    {
        setLoading(true);
        setPageIndex(page);
        const followInfoRequest: PaginationParam =
            {
                pageIndex: page,
                pageCapacity: pageSize,
            };

        const urlToGetFollowInfos: string = followType === FollowType.Followers ? UrlToGetFollowers : UrlToGetFollowings;
        axiosWithInterceptor.get(urlToGetFollowInfos, {
            params: followInfoRequest,
            paramsSerializer: params => qs.stringify(params)
        })
            .then(response =>
            {
                const followers: UserFollowingInfo[] = response.data.data.data;
                setFollowingInfos(followers);

                setTotalFollowings(response.data.data.total);

                setLoading(false);
            });
    }

    const getFollowInfoTotal = () =>
    {
        return followType === FollowType.Followings ? TotalFollowings : TotalFollowers;
    }

    useEffect(() =>
    {
        console.log("followType = " + followType);
        getFollowInfos(1, defaultPageSize);
    }, [followType]);

    return (
        <Spin spinning={loading} size="large" tip="Loading..." delay={500}>
            <List
                style={{textAlign: "left"}}
                itemLayout="horizontal"
                size="large"
                dataSource={followingInfos}
                renderItem={(item) => (
                    <List.Item
                        key={item.userId}
                        actions={[
                            <Button type="default">Direct Message</Button>,
                            <Tooltip title={item.followState ? "Click to unfollow" : "Click to follow"}>
                                <Button
                                    type="primary"
                                    onClick={() => setFollowState(item.userId)}
                                    style={{minWidth: "120px"}}
                                >
                                    {item.followState ? "Following" : "Follow"}
                                </Button>
                            </Tooltip>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatarUrl} />}
                            title={item.nickname}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                current={pageIndex}
                total={totalFollowings}
                showQuickJumper
                showTotal={(total) => `${(getFollowInfoTotal())}: ${total}`}
                onChange={onPageChange}
                defaultPageSize={defaultPageSize}
            />
        </Spin>
    );
}

export default FollowInfoList;

/*
    注意点：
    {...user, followState: nextFollowState}讲解：
    创建了一个新的对象user（只改变了followState）
    ...user - 将原用户对象的所有属性展开
    followState: nextFollowState - 只覆盖 followState 属性
    原因：在React中，状态(State)是不可变的，我们不能直接修改原状态，而是必须创建新状态


    这个组件的主要功能是：
    1、显示用户的关注者/粉丝列表
    2、支持分页浏览
    3、可以关注/取消关注其他用户
    4、提供私信按钮(功能未实现)

    组件的工作流程：
    1、根据传入的 followType 决定显示哪种列表
    2、首次加载和类型变化时获取第一页数据
    3、用户切换页码时获取对应页的数据
    4、用户可以点击按钮关注/取消关注其他用户
 */