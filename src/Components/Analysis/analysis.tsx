import React, {useEffect, useState} from 'react';
import {Avatar, Card, Col, message, Row} from 'antd';
import Meta from "antd/es/card/Meta";
import {useSelector} from "react-redux";
import {LoginState} from "../../dtos/LoginState.ts";
import {useLocation, useNavigate} from "react-router-dom";
import RouteQueryParams from "../../constants/RouteQueryParams.ts";
import axiosWithInterceptor from "../../axios/axios.tsx";
import qs from "qs";
import {VideoPlayInfo} from "../../dtos/VideoPlayInfo.ts";
import {TranscriptAnalysis} from "../../dtos/TranscriptAnalysis.ts";
import DemoColumn from "../DemoColumn/demoColumn.tsx";
import {Column} from "@ant-design/plots";



const Analysis: React.FC = () => {

    const userInfo: LoginState = useSelector((state) => state.userInfo);
    const [videoInfo, setVideoInfo] = useState<VideoPlayInfo>();
    const [transcriptAnalysis, setTranscriptAnalysis] = useState<TranscriptAnalysis>();
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const videoIdString: string | null = queryParams.get(RouteQueryParams.VideoId);
    const videoId: number = parseInt(videoIdString as string);
    if (isNaN(videoId)) {
        message.error("Invalid video ID.")
            .then(x => navigate("/"));
    }

    useEffect(() => {
        (async () => {
            const videoInfoResponse = await axiosWithInterceptor.get("/api/video/play",
                {
                    params: {videoId: videoId},
                    paramsSerializer: params => qs.stringify(params)
                });
            const videoInfo: VideoPlayInfo = videoInfoResponse.data.data;
            setVideoInfo(videoInfo);

            const videoAnalysisResponse = await axiosWithInterceptor.get("/api/video/analysis",
                {
                    params: {videoId: videoId},
                    paramsSerializer: params => qs.stringify(params)
                });
            const transcriptAnalysis: TranscriptAnalysis = videoAnalysisResponse.data.data;
            setTranscriptAnalysis(transcriptAnalysis);
        })();
    }, [videoId]);

    const chartData =  [
        { type: '激励', value: transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts?.motivate || 0 },
        { type: '否定', value: transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts?.negative || 0 },
        { type: '重复', value: transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts?.repeat || 0 },
        { type: '针对肯定', value: transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts?.targetedAffirmative || 0 },
        { type: '简单肯定', value: transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts?.simpleAffirmative || 0 },
    ];

    const config = {
        chartData,
        xField: 'type',
        yField: 'value',
        shapeField: 'column25D',
        style: {
            fill: 'rgba(126, 212, 236, 0.8)',
        },
    };

    return <div style={{padding: '16px',}}>
        <Card title={videoInfo?.title || '默认标题'} styles={{
            header: {
                borderBottom: 'none',
                fontSize: '30px',
                textAlign: 'left',
                marginTop: '20px'
            }
        }}>
            <div style={{textAlign: 'left', marginBottom: '30px'}}>
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                    title={userInfo.nickname}
                />
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card style={{borderRadius: '8px', height: '250px'}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '50px'
                        }}>
                            <div>
                                <span style={{
                                    fontSize: '32px',
                                    fontWeight: 'bold'
                                }}>{transcriptAnalysis?.courseAnalysis.totalMinutes || "默认"}</span> 分钟
                                <p style={{marginTop: '8px',color: '#666'}}>课堂时长</p>
                            </div>
                            <div>
                                <span style={{
                                    fontSize: '32px',
                                    fontWeight: 'bold'
                                }}>{transcriptAnalysis?.courseAnalysis.proportionTeacher || "默认"}%</span>
                                <p style={{marginTop: '8px',color: '#666'}}>教师行为</p>
                            </div>
                            <div>
                                <span style={{
                                    fontSize: '32px',
                                    fontWeight: 'bold'
                                }}>{transcriptAnalysis?.courseAnalysis.proportionStudent || "默认"}%</span>
                                <p style={{marginTop: '8px',color: '#666'}}>学生行为</p>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{borderRadius: '8px', height: '250px'}}>
                        <div style={{textAlign: 'left'}}>
                            <span style={{fontSize: '15px', fontWeight: 'bold'}}>对话型授课</span>
                            <p style={{color: '#666', marginTop: '8px', fontSize: '13px', textAlign: 'left'}}>
                                从Rt值0.50和Ch值0.45来看，本节课属于对话型课堂类型。对话型课堂的特点是教师与学生之间的互动适中，能有效促进学生的思考和参与，同时也能让教师根据学生的反馈进行适度引导。然而，过高的行为转换率可能导致课堂节奏的快速变化，影响学生对知识的深入理解和吸收。建议在今后的教学中，教师可以适当减少引导的频率和时间，给学生更多的思考和表达机会，如通过小组讨论或角色扮演，增强课堂的连贯性和深度。
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Card>
        <Card title="AI课程总览" extra={<a href="#">More</a>} styles={{
            header: {
                fontSize: '25px',
                borderBottom: 'none',
                marginTop: '20px',
                textAlign: 'left',
                color: '#1890ff',
                fontWeight: 'bold'
            }
        }}>
            <div style={{padding: "0 0"}}>
                <p style={{color: '#666', fontSize: '15px', textAlign: 'left'}}>
                    {transcriptAnalysis?.courseAnalysis.aiCourseOverview || "默认内容"}
                </p>
                <button style={{
                    backgroundColor: '#37a000',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer'
                }}>查看更多
                </button>
            </div>
        </Card>
        {/*<DemoCard/>*/}
        {/*<DemoColumn/>*/}
        <Column {...config} />
    </div>
};
export default Analysis;