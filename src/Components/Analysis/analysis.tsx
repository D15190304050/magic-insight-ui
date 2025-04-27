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
import DemoPie from "../DemoPie/demoPie.tsx";
import DemoArea from "../DemoArea/demoArea.tsx";

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

            // Reduce the call of "/api/video/analysis".
            const videoAnalysisResponse = await axiosWithInterceptor.get("/api/video/analysis",
                {
                    params: {videoId: videoId},
                    paramsSerializer: params => qs.stringify(params)
                });
            const transcriptAnalysis: TranscriptAnalysis = videoAnalysisResponse.data.data;
            setTranscriptAnalysis(transcriptAnalysis);
        })();
    }, [videoId]);

    return (
        <div style={{padding: '16px'}}>
            <Card title={videoInfo?.title || '默认标题'} styles={{
                header: {
                    borderBottom: 'none',
                    fontSize: '50px',
                    textAlign: 'left',
                    marginTop: '20px'
                }
            }}>
                <div style={{textAlign: 'left', marginBottom: '30px',}}>
                    <Meta
                        avatar={<Avatar src={userInfo.avatarUrl}/>}
                        title={userInfo.nickname}
                    />
                </div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="AI课堂总览" style={{  borderRadius: '8px',height: '450px',background: 'rgba(240, 249, 255, 0.6)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(24, 144, 255, 0.2)',
                            boxShadow: '0 4px 20px rgba(24, 144, 255, 0.1)' }} styles={{
                            header: {
                                fontSize: '25px',
                                borderBottom: 'none',
                                marginTop: '20px',
                                textAlign: 'left',
                                color: '#1890ff',
                                fontWeight: 'bold'
                            }
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.courseAnalysis.totalMinutes || "默认"}</span>分钟
                                    <p style={{ marginTop: '8px',color: '#666' }}>课堂时长</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.courseAnalysis.proportionTeacher || "默认"}%</span>
                                    <p style={{ marginTop: '8px',color: '#666' }}>教师行为</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.courseAnalysis.proportionStudent || "默认"}%</span>
                                    <p style={{ marginTop: '8px',color: '#666' }}>学生行为</p>
                                </div>
                            </div>
                            <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px',fontSize:'25px' }}>
                                AI分析
                            </div>
                            <p style={{textAlign: 'left'}}>
                                {transcriptAnalysis?.courseAnalysis.aiCourseOverview || "默认内容"}
                            </p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="讲授分析" style={{  borderRadius: '8px',height: '450px',boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} styles={{
                            header: {
                                fontSize: '25px',
                                borderBottom: 'none',
                                marginTop: '20px',
                                textAlign: 'left',
                                color: '#1890ff',
                                fontWeight: 'bold'
                            }
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.speechRateAnalysis.value}</span> 字/秒
                                    <p style={{ marginTop: '8px',color: '#666' }}>平均语速</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.speechRateAnalysis.wordCount}</span> 字
                                    <p style={{ marginTop: '8px',color: '#666' }}>讲授字数</p>
                                </div>
                            </div>
                            <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px',fontSize:'25px' }}>
                                AI分析
                            </div>
                            <p style={{textAlign: 'left'}}>
                                {transcriptAnalysis?.speechRateAnalysis.analysisOfSpeechRate}
                            </p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="提问分析" style={{  borderRadius: '8px',height: '450px',boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} styles={{
                            header: {
                                fontSize: '25px',
                                borderBottom: 'none',
                                marginTop: '20px',
                                textAlign: 'left',
                                color: '#1890ff',
                                fontWeight: 'bold'
                            }
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.questionAnalysis.coreQuestionCount}</span> 次
                                    <p style={{ marginTop: '8px',color: '#666' }}>核心提问</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{transcriptAnalysis?.questionAnalysis.evaluationCount}</span> 次
                                    <p style={{ marginTop: '8px',color: '#666' }}>评价次数</p>
                                </div>
                            </div>
                            <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px',fontSize:'25px' }}>
                                AI分析
                            </div>
                            <p style={{textAlign: 'left'}}>
                                {transcriptAnalysis?.questionAnalysis.analysisOfQuestioning}</p>
                            <p style={{textAlign: 'left'}}>
                                {transcriptAnalysis?.questionAnalysis.analysisOfEvaluation}</p>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <div style={{ display: 'flex', gap: '16px', marginTop:'100px' }}>
                <div style={{ flex: 1 }}><DemoColumn /></div>
                <div style={{ flex: 1 }}><DemoPie /></div>
                <div style={{ flex: 1 }}><DemoArea feedbackCounts={transcriptAnalysis?.interactionTypeCountMap?.feedbackCounts} /></div>
            </div>
        </div>
    );
};
export default Analysis;