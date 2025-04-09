
import { Column } from '@ant-design/plots';

const data = [
    { type: '简单肯定', value: 0.2 },
    { type: '针对肯定', value: 0.6 },
    { type: '激励', value: 0.1 },
    { type: '否定', value: 0.05 },
    { type: '重复', value: 0.05 },
];

const DemoColumn = () => {
    const config = {
        data,
        xField: 'type',
        yField: 'value',
        shapeField: 'column25D',
        style: {
            fill: 'rgba(126, 212, 236, 0.8)',
        },
    };
    return <Column {...config} />;
};

export default DemoColumn;