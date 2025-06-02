import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { Card, message } from 'antd';
import axiosWithInterceptor from '../../axios/axios.tsx';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteQueryParams from '../../constants/RouteQueryParams.ts';
import {FeedbackCounts, TranscriptAnalysis} from "../../dtos/TranscriptAnalysis.ts";

// Upper case for the first letter => file name.
const DemoArea = ({feedbackCounts}: {feedbackCounts: FeedbackCounts | undefined}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const videoIdString: string | null = queryParams.get(RouteQueryParams.VideoId);
    const videoId: number = parseInt(videoIdString as string);

    if (isNaN(videoId)) {
        message.error('Invalid video ID.')
            .then(() => navigate('/'));
    }

    const chartData = [
        { type: '激励', value: feedbackCounts?.motivate || 0 },
        { type: '否定', value: feedbackCounts?.negative || 0 },
        { type: '重复', value: feedbackCounts?.repeat || 0 },
        { type: '针对肯定', value: feedbackCounts?.targetedAffirmative || 0 },
        { type: '简单肯定', value: feedbackCounts?.simpleAffirmative || 0 },
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