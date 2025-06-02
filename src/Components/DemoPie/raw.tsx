import React from 'react';
import { Pie } from '@ant-design/plots';

const DemoPie: React.FC = () => {
    const config = {
        data: [
            { type: '是何问题', value: 27 },
            { type: '为何问题', value: 25 },
            { type: '如何问题', value: 18 },
            { type: '若何问题', value: 18 },
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
                    text: 'questioning\ntype',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return <Pie {...config} />;
};

export default DemoPie; // 作为组件导出