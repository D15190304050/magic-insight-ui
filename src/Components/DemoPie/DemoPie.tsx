import React from 'react';
import {Pie} from '@ant-design/plots';
import {QuestionCounts} from "../../dtos/TranscriptAnalysis.ts";
import {useLocation, useNavigate} from "react-router-dom";
import RouteQueryParams from "../../constants/RouteQueryParams.ts";
import {Card, message} from "antd";

const DemoPie: React.FC = ({questionCounts}: { questionCounts: QuestionCounts | undefined }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const videoIdString: string | null = queryParams.get(RouteQueryParams.VideoId);
    const videoId: number = parseInt(videoIdString as string);
    if (isNaN(videoId)) {
        message.error("Invalid video ID.")
            .then(x => navigate("/"));
    }

    const config = {
        data: [
            {type: '是何问题', value: questionCounts?.what},
            {type: '为何问题', value: questionCounts?.why},
            {type: '如何问题', value: questionCounts?.how},
            {type: '若何问题', value: questionCounts?.whatIf},
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Question\nType',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (<Card title="提问类型-4MAT模式" styles={{
        header: {
            fontSize: '25px',
        }
    }}>
        <Pie {...config} />
    </Card>);
};

export default DemoPie; // 作为组件导出