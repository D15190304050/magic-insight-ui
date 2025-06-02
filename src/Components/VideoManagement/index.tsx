import React, {useEffect, useState} from "react";
import {Avatar, Button, Col, Divider, List, Pagination, Row, Space} from "antd";
import {
    BarChartOutlined,
    EditOutlined,
    LikeOutlined,
    MessageOutlined,
    PlayCircleOutlined,
    StarOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import RoutePaths from "../../constants/RoutePaths.ts";
import axiosWithInterceptor from "../../axios/axios.tsx";
import {PaginationParam} from "../../dtos/CommonQueryParams.ts";
import qs from "qs";
import {VideoPlayInfo} from "../../dtos/VideoPlayInfo.ts";
import RouteQueryParams from "../../constants/RouteQueryParams.ts";
import IconText from "../IconText";

const VideoManagement = () =>
{
    const navigate: NavigateFunction = useNavigate();
    const [videoCount, setVideoCount] = useState<number>(25);
    const [videoInfos, setVideoInfos] = useState<VideoPlayInfo[]>([]);

    const jumpToUpload = () =>
    {
        navigate(RoutePaths.VideoUploading);
    }

    const getVideoInfos = async (page: number, pageSize: number) =>
    {
        const param: PaginationParam =
            {
                pageCapacity: pageSize,
                pageIndex: page,
            };

        const response = await axiosWithInterceptor.get("/api/video/list", {
            params: param,
            paramsSerializer: params => qs.stringify(params)
        });

        const videoInfos: VideoPlayInfo[] = response.data.data;
        setVideoInfos(videoInfos);
    }

    const onPageChange = async (page: number, pageSize: number) =>
    {
        await getVideoInfos(page, pageSize);
    }

    const onBtEditClick = (id: number) =>
    {
        const searchParams = createSearchParams({
            videoId: id.toString(),
        });

        const destinationUrl: string = RoutePaths.VideoUpdate + "?" + searchParams.toString();
        navigate(destinationUrl);
    }
    const onBtAnalyzeClick = (id: number) =>
    {
        const searchParams = createSearchParams({
            videoId: id.toString(),
        });

        const destinationUrl: string = RoutePaths.Analysis + "?" + searchParams.toString();
        navigate(destinationUrl);
    }
    useEffect(() =>
    {
        (async () =>
        {
            const videoCountResponse = await axiosWithInterceptor.get("/api/video/count");
            const videoCount = videoCountResponse.data.data;
            setVideoCount(videoCount);

            await getVideoInfos(1, 10);
        })();
    }, []);


    return (
        <div>
            <Row>
                <Col span={24}>
                    <h2>视频管理</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={3}>
                            <h3 style={{textAlign: "left", lineHeight: "15px"}}>视频数量: {videoCount}</h3>
                        </Col>
                        <Col push={18} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button type="primary" onClick={jumpToUpload}>上传视频</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{textAlign: "left"}}>
                <Col span={24}>
                    <List
                        // itemLayout="vertical"
                        itemLayout="horizontal"
                        size="large"
                        dataSource={videoInfos}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText icon={PlayCircleOutlined} text={item.playCount + ""} key={"list-play-o-" + item.id} />,
                                    <IconText icon={StarOutlined} text={item.favoritesCount + ""} key={"list-star-o-" + item.id} />,
                                    <IconText icon={LikeOutlined} text={item.likeCount + ""} key={"list-like-o-" + item.id} />,
                                    <IconText icon={MessageOutlined} text={item.commentCount + ""} key={"list-message-" + item.id} />,
                                    <Button type="primary" icon={<EditOutlined />} onClick={() => onBtEditClick(item.id)} key={"list-bt-edit-" + item.id}>编辑</Button>,
                                    <Button type="primary" icon={<BarChartOutlined/>} onClick={() => onBtAnalyzeClick(item.id)} key={"list-video-analyze-" + item.id}>分析结果</Button>,

                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.coverUrl} />}
                                    title={<a href={`${RoutePaths.VideoPlayPage}?${RouteQueryParams.VideoId}=${item.id}`}>{item.title}</a>}
                                    description={item.introduction}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination
                        total={videoCount}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `视频数量: ${total}`}
                        onChange={onPageChange}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default VideoManagement;