import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { Card, message } from 'antd';
import axiosWithInterceptor from '../../axios/axios.tsx';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteQueryParams from '../../constants/RouteQueryParams.ts';
import {TranscriptAnalysis} from "../../dtos/TranscriptAnalysis.ts";

const DemoArea = () => {

    const [transcriptAnalysis, setTranscriptAnalysis] = useState<TranscriptAnalysis>();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const videoIdString: string | null = queryParams.get(RouteQueryParams.VideoId);
    const videoId: number = parseInt(videoIdString as string);

    if (isNaN(videoId)) {
        message.error('Invalid video ID.')
            .then(() => navigate('/'));
    }
    useEffect(() => {
        (async () => {
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
        data: chartData,
        xField: 'type',
        yField: 'value',
        style: {
            fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
        },
        axis: {
            y: { labelFormatter: '~s' },
        },
        line: {
            style: {
                stroke: 'darkgreen',
                strokeWidth: 2,
            },
        },
    };

    return (
        <Card title="评价类型" styles={{
            header: {
                fontSize: '25px',
            }
        }}>
            <Area {...config} />
        </Card>
    );
};

export default DemoArea;