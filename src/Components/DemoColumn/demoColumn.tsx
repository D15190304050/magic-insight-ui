import { Column } from '@ant-design/plots';
import {FeedbackCounts} from "../../dtos/TranscriptAnalysis.ts";
import {useLocation, useNavigate} from "react-router-dom";
import RouteQueryParams from "../../constants/RouteQueryParams.ts";
import {Card, message} from "antd";


const DemoColumn = ({feedbackCounts}:{feedbackCounts:FeedbackCounts}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const videoIdString: string | null = queryParams.get(RouteQueryParams.VideoId);
    const videoId: number = parseInt(videoIdString as string);
    if (isNaN(videoId)) {
        message.error("Invalid video ID.")
            .then(x => navigate("/"));
    }

    const chartData =  [
        { type: '激励', value: feedbackCounts?.motivate || 0 },
        { type: '否定', value: feedbackCounts?.negative || 0 },
        { type: '重复', value: feedbackCounts?.repeat || 0 },
        { type: '针对肯定', value: feedbackCounts?.targetedAffirmative || 0 },
        { type: '简单肯定', value: feedbackCounts?.simpleAffirmative || 0 },
    ];

    const config = {
        data:chartData,
        xField: 'type',
        yField: 'value',
        shapeField: 'column25D',
        style: {
            fill: 'rgba(126, 212, 236, 0.8)',
        },
    };

    return (
        <Card title="评价类型" bordered={false} styles={{
            header: {
                fontSize: '25px',
            }
        }}>
            <Column {...config} />
        </Card>
    );
};

export default DemoColumn;